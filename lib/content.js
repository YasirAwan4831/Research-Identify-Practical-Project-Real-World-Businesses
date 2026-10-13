import document from "@/content/document.json";

export const sections = document;
export const getSection = (slug) => sections.find((s) => s.id === slug);
export const sectionLabel = (s) => `${s.number}. ${s.title}`;
export function neighbours(slug) {
  const i = sections.findIndex((s) => s.id === slug);
  return { prev: sections[i - 1] || null, next: sections[i + 1] || null };
}
export const headings = (section) => section.blocks.filter((b) => b.type === "h2");
export const section = (n) => sections.find((s) => s.number === String(n));
export const blocksOf = (n, type) => section(n).blocks.filter((b) => b.type === type);
export const blockOf = (n, type, which = 0) => blocksOf(n, type)[which];
export const bodyRows = (n, type = "table", which = 0) => blockOf(n, type, which).rows.slice(1);
// The three idea sections are 2, 3 and 4.
export const ideaSections = [2, 3, 4].map((n) => section(n));
export const ideaTitle = (n) => blockOf(n, "title").text;
export const ideaIndustry = (n) => blockOf(n, "industry").text;
export const ideaOverview = (n) => { const b = section(n).blocks; const i = b.findIndex((x) => x.type === "h2" && x.text === "Project Overview"); return b[i + 1].text; };
export const ideaProblem = (n) => { const b = section(n).blocks; const i = b.findIndex((x) => x.type === "h2" && x.text === "Problem Statement"); return b[i + 1].text; };
function flat(v) { return typeof v === "string" ? [v] : Array.isArray(v) ? v.flatMap(flat) : v && typeof v === "object" ? Object.entries(v).filter(([k]) => !["type", "id", "image", "url", "number"].includes(k)).flatMap(([, x]) => flat(x)) : []; }
export function searchIndex() {
  const entries = [];
  sections.forEach((s) => {
    let current = { anchor: "", heading: s.title, parts: [] };
    const push = () => current.parts.length && entries.push({ slug: s.id, anchor: current.anchor, sectionTitle: sectionLabel(s), heading: current.heading, text: current.parts.join(" ") });
    s.blocks.forEach((b) => {
      if (b.type === "h2") { push(); current = { anchor: b.id, heading: `${b.number} ${b.text}`, parts: [] }; }
      else current.parts.push(flat(b).join(" "));
    });
    push();
  });
  return entries;
}
