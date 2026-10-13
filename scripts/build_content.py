"""Builds content/document.json (sections -> typed blocks) directly from source/task-04.docx.
Usage: python3 scripts/build_content.py"""
import json, re, subprocess, collections, zipfile
import docx
from docx.table import Table
from docx.text.paragraph import Paragraph
SRC = "source/task-04.docx"
d = docx.Document(SRC)
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
rels = {r.rId: r.target_ref for r in d.part.rels.values() if "hyperlink" in r.reltype}
def slug(s): return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
def clean(s): return re.sub(r"\s+", " ", s.replace(" ", " ")).strip()
def ptext(p):
    # includes hyperlink runs
    return clean("".join(t.text or "" for t in p._p.iter("{%s}t" % NS["w"])))
def plink(p):
    for h in p._p.iter("{%s}hyperlink" % NS["w"]):
        rid = h.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id")
        if rid in rels: return rels[rid]
    return None
def cell_paras(c): return [Paragraph(p, c) for p in c._tc.iter("{%s}p" % NS["w"])]
def cell_text(c): return clean(" ".join(ptext(p) for p in cell_paras(c) if ptext(p)))
def bold_lead(p):
    runs = [r for r in p.runs]
    lead = ""
    for r in runs:
        if r.bold: lead += r.text
        else: break
    return clean(lead)

body = list(d.element.body.iterchildren())
toc_pages = {}
sections, cur = [], None
def add(b): cur["blocks"].append(b)
sec_i = -1
for el in body:
    t = el.tag.split("}")[1]
    if t == "p":
        p = Paragraph(el, d); txt = ptext(p); sn = p.style.name
        if sn == "toc 1":
            m = re.match(r"^(\d+)\.\s+.*?(\d+)$", txt)
            if m: toc_pages[m.group(1)] = int(m.group(2))
            continue
        if not txt: continue
        if sn == "Heading 1":
            m = re.match(r"^(\d+)\.\s+(.*)$", txt)
            cur = dict(id=slug(txt), number=m.group(1), title=m.group(2), page=toc_pages.get(m.group(1)), blocks=[]); sections.append(cur); continue
        if cur is None: continue
        if sn == "Heading 2":
            m = re.match(r"^(\d+\.\d+)\s+(.*)$", txt); add(dict(type="h2", id=slug(txt), number=m.group(1), text=m.group(2)))
        elif sn == "List Paragraph":
            add(dict(type="li", text=txt, lead=bold_lead(p)))
        elif re.match(r"^Figure \d+\.", txt): pass  # captions handled with the figure / workflow
        elif p.runs and all(r.italic for r in p.runs if r.text.strip()): add(dict(type="note", text=txt))
        elif re.match(r"^(Future enhancements|Trade-off to evaluate)", txt): add(dict(type="note", text=txt, lead=bold_lead(p)))
        else: add(dict(type="p", text=txt))
    elif t == "tbl" and cur is not None:
        tb = Table(el, d); R, C = len(tb.rows), len(tb.columns)
        first = cell_text(tb.rows[0].cells[0])
        if R == 1 and C == 2:  # image + title/overview/problem
            cap = cell_paras(tb.rows[0].cells[0]); caption = [ptext(p) for p in cap if ptext(p)]
            img = el.xpath(".//a:blip/@r:embed") if hasattr(el, "xpath") else []
            add(dict(type="figure", image=None, caption=caption[0] if caption else ""))
            for p in cell_paras(tb.rows[0].cells[1]):
                x = ptext(p)
                if not x: continue
                m = re.match(r"^(\d+\.\d+)\s+(.*)$", x)
                if p.style.name == "Heading 2" and m: add(dict(type="h2", id=slug(x), number=m.group(1), text=m.group(2)))
                elif x.startswith("Industry:"): add(dict(type="industry", text=x.replace("Industry:", "").strip()))
                elif p.runs and p.runs[0].bold and cur["blocks"][-1].get("number", "").endswith(".1"): add(dict(type="title", text=x))
                else: add(dict(type="p", text=x))
        elif R == 1 and C == 1:  # callout
            ps = [p for p in cell_paras(tb.rows[0].cells[0]) if ptext(p)]
            title = ptext(ps[0]); rest = ps[1:]
            items = [ptext(p) for p in rest if p.style.name == "List Paragraph" or p._p.find(".//w:numPr", NS) is not None]
            text = " ".join(ptext(p) for p in rest if ptext(p) not in items)
            add(dict(type="callout", title=title, text=text, items=items))
        elif R == 1 and C == 9:  # five-step workflow
            steps = []
            for ci in (0, 2, 4, 6, 8):
                ps = [ptext(p) for p in cell_paras(tb.rows[0].cells[ci]) if ptext(p)]
                steps.append(dict(n=ps[0], title=ps[1], text=ps[2]))
            add(dict(type="steps", steps=steps, caption=None))
        elif first == "Technology":
            rows = [[cell_text(c) for c in r.cells] for r in tb.rows]; add(dict(type="tech", rows=rows))
        elif first == "Source":
            entries = []
            for r in tb.rows[1:]:
                ps = [p for p in cell_paras(r.cells[0]) if ptext(p)]
                entries.append(dict(name=ptext(ps[0]), link=ptext(ps[1]), url=plink(ps[1]), offers=cell_text(r.cells[1]), lesson=cell_text(r.cells[2])))
            add(dict(type="research", entries=entries))
        elif first == "No.":
            entries = []
            for r in tb.rows[1:]:
                c = r.cells
                entries.append(dict(no=cell_text(c[0]), name=cell_text(c[1]), relevance=cell_text(c[2]), url=cell_text(c[3]), accessed=cell_text(c[4])))
            add(dict(type="sources", entries=entries))
        elif C == 2 and R == 4 and "." in first and not first.startswith("Role"):  # 4x2 feature grid
            feats = []
            for r in tb.rows:
                for c in r.cells:
                    p = cell_paras(c)[0]; lead = bold_lead(p).rstrip("."); full = ptext(p)
                    feats.append([lead, full[len(bold_lead(p)):].strip()])
            add(dict(type="features", rows=feats))
        else:
            rows = [[cell_text(c) for c in r.cells] for r in tb.rows]; add(dict(type="table", rows=rows))
# figure images + workflow captions (from the document order)
imgs = ["/images/ideas/it-academy.jpg", "/images/ideas/clinic.jpg", "/images/ideas/retail.jpg"]
caps = [p for p in (ptext(Paragraph(e, d)) for e in body if e.tag.endswith("}p")) if re.match(r"^Figure \d+\.", p)]
fi = 0; wi = 0
wf_caps = [c for c in caps if "workflow" in c]
for s in sections:
    for b in s["blocks"]:
        if b["type"] == "figure": b["image"] = imgs[fi]; fi += 1
        if b["type"] == "steps": b["caption"] = wf_caps[wi]; wi += 1
# merge "title" into following structure; record idea key on idea sections
for s in sections:
    s["blocks"] = [b for b in s["blocks"]]
json.dump(sections, open("content/document.json", "w"), ensure_ascii=False, indent=1)
for s in sections: print(s["number"], s["title"], s["page"], [b["type"] for b in s["blocks"] if b["type"] not in ("p", "li", "h2")])
# loss check against the docx text (pandoc plain)
plain = subprocess.run(["pandoc", SRC, "-t", "plain", "--wrap=none"], capture_output=True, text=True).stdout
src_words = collections.Counter(re.findall(r"[A-Za-z0-9]+", plain))
mine = collections.Counter(re.findall(r"[A-Za-z0-9]+", json.dumps(sections)))
skip_w = {"ZAYAN", "SOFT", "TECH", "INTERNSHIP", "TASK", "Prepared", "By", "Domain", "Organization", "Submission", "Date", "Table", "of", "Contents", "Research", "and", "Identify", "Practical", "Project", "Ideas", "for", "Real", "World", "Businesses", "Three", "based", "concepts", "an", "IT", "academy", "system", "a", "clinic", "appointment", "retail", "inventory"}
print("missing:", {w: n - mine[w] for w, n in src_words.items() if n - mine[w] > 0 and w not in skip_w})
