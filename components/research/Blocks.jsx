import Image from "next/image";
import { Info, ArrowRight, ArrowDown, ExternalLink, ShieldAlert } from "lucide-react";
import CopyLink from "@/components/ui/CopyLink";
import ResponsiveTable from "./ResponsiveTable";

export function Callout({ block, warn }) {
  const Icon = warn ? ShieldAlert : Info;
  return (
    <aside className={`not-prose my-8 rounded-lg border-l-4 p-5 font-sans ${warn ? "border-amber-500 bg-amber-500/10" : "border-gold-500 bg-gold-300/15"}`}>
      <p className="flex items-center gap-2 font-semibold text-navy-800 dark:text-white"><Icon size={18} aria-hidden /> {block.title}</p>
      {block.text && <p className="mt-2 text-[0.95rem] leading-7">{block.text}</p>}
      {block.items?.length > 0 && <ul className="mt-2 list-disc space-y-2 pl-5 text-[0.95rem] leading-7 marker:text-gold-500">{block.items.map((t) => <li key={t}>{t}</li>)}</ul>}
    </aside>
  );
}
export function Features({ rows }) {
  return (
    <ul className="not-prose my-6 grid gap-3 font-sans sm:grid-cols-2">
      {rows.map(([t, d]) => <li key={t} className="card p-4 text-sm leading-6"><p className="font-semibold text-navy-800 dark:text-white">{t}</p><p className="mt-1">{d}</p></li>)}
    </ul>
  );
}
const statusTone = (s) => /^essential/i.test(s) ? "bg-gold-600 text-white" : /^recommended/i.test(s) ? "bg-navy-700 text-white" : "bg-slate-200 text-slate-800 dark:bg-white/15 dark:text-slate-100";
export function Tech({ rows }) {
  const body = rows.slice(1);
  return (
    <ul className="not-prose my-6 grid gap-3 font-sans sm:grid-cols-2">
      {body.map(([t, use, st]) => (
        <li key={t} className="card flex flex-col p-4 text-sm leading-6">
          <span className={`mb-2 w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusTone(st)}`}>{st}</span>
          <p className="font-semibold text-navy-800 dark:text-white">{t}</p>
          <p className="mt-1">{use}</p>
        </li>
      ))}
    </ul>
  );
}
export function Steps({ steps, caption, label = "Proposed workflow" }) {
  return (
    <figure className="not-prose my-8 rounded-xl border border-slate-200 bg-slate-50 p-4 font-sans sm:p-6 dark:border-white/10 dark:bg-navy-900/60">
      <figcaption className="mb-4 text-lg font-semibold text-navy-800 dark:text-white">{label}</figcaption>
      <ol className="flex flex-col items-stretch gap-1 lg:flex-row lg:items-stretch">
        {steps.map((s, i) => (
          <li key={s.n} className="flex flex-col items-center gap-1 lg:flex-1 lg:flex-row">
            <div className={`wf-node flex h-full w-full flex-col rounded-lg border p-3 text-center ${i === steps.length - 1 ? "border-gold-500 bg-navy-800 text-white" : "border-slate-300 bg-white dark:border-white/20 dark:bg-navy-900"}`} style={{ animationDelay: `${i * 90}ms` }}>
              <span aria-hidden className={`mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i === steps.length - 1 ? "bg-gold-500 text-white" : "bg-navy-800 text-white dark:bg-gold-500"}`}>{s.n}</span>
              <span className="text-sm font-semibold"><span className="sr-only">Step {s.n}: </span>{s.title}</span>
              <span className={`mt-1 block text-xs leading-5 ${i === steps.length - 1 ? "text-slate-200" : "text-slate-600 dark:text-slate-300"}`}>{s.text}</span>
            </div>
            {i < steps.length - 1 && (<><ArrowDown size={16} aria-hidden className="shrink-0 text-gold-600 lg:hidden" /><ArrowRight size={16} aria-hidden className="hidden shrink-0 text-gold-600 lg:block" /></>)}
          </li>
        ))}
      </ol>
      {caption && <p className="mt-3 text-xs italic text-slate-600 dark:text-slate-300">{caption}</p>}
    </figure>
  );
}
export function Research({ entries }) {
  return (
    <div className="not-prose my-6 space-y-4 font-sans">
      {entries.map((e) => (
        <article key={e.name} className="card overflow-hidden">
          <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-navy-50 px-4 py-2 dark:border-white/10 dark:bg-white/5">
            <h3 className="font-semibold text-navy-800 dark:text-white">{e.name}</h3>
            {e.url && <a href={e.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-gold-700 underline underline-offset-4 dark:text-gold-300">{e.link} <ExternalLink size={14} aria-hidden /></a>}
          </header>
          <dl className="grid gap-4 p-4 text-sm leading-6 md:grid-cols-2">
            <div><dt className="text-xs font-semibold text-gold-700 dark:text-gold-300">What the source offers</dt><dd>{e.offers}</dd></div>
            <div><dt className="text-xs font-semibold text-gold-700 dark:text-gold-300">Lesson for this proposal</dt><dd>{e.lesson}</dd></div>
          </dl>
        </article>
      ))}
    </div>
  );
}
export function Sources({ entries }) {
  return (
    <ol className="not-prose my-6 space-y-3 font-sans">
      {entries.map((e) => (
        <li key={e.no} className="card flex gap-4 p-4">
          <span className="font-bold text-gold-700 dark:text-gold-300">{e.no}</span>
          <div className="min-w-0 text-sm leading-6">
            <p className="font-semibold text-navy-800 dark:text-white">{e.name}</p>
            <p>{e.relevance}</p>
            <p className="break-all"><a href={e.url} target="_blank" rel="noopener noreferrer" className="font-medium text-gold-700 underline underline-offset-4 dark:text-gold-300">{e.url}</a></p>
            <p className="text-xs text-slate-600 dark:text-slate-300">Accessed {e.accessed}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
export function Figure({ block }) {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-slate-200 font-sans dark:border-white/10">
      <Image src={block.image} alt={block.caption.replace(/^Figure \d+\.\s*/, "")} width={1000} height={650} className="h-auto w-full" sizes="(min-width: 1024px) 40rem, 100vw" />
      <figcaption className="bg-slate-50 px-4 py-2 text-xs italic text-slate-600 dark:bg-navy-900 dark:text-slate-300">{block.caption}</figcaption>
    </figure>
  );
}

export default function Blocks({ blocks }) {
  const out = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "li") {
      const items = [];
      while (blocks[i]?.type === "li") items.push(blocks[i++]);
      i--; out.push(<ul key={i}>{items.map((t, j) => <li key={j}>{t.lead ? <><strong>{t.lead}</strong>{t.text.slice(t.lead.length)}</> : t.text}</li>)}</ul>);
    } else if (b.type === "p") out.push(<p key={i}>{b.text}</p>);
    else if (b.type === "note") out.push(<p key={i} className="rounded-md border-l-4 border-navy-200 bg-slate-50 px-4 py-2 font-sans text-sm italic leading-6 dark:border-white/20 dark:bg-white/5">{b.lead ? <><strong className="not-italic">{b.lead}</strong>{b.text.slice(b.lead.length)}</> : b.text}</p>);
    else if (b.type === "h2") out.push(<h2 key={i} id={b.id}>{b.number} {b.text}<CopyLink anchor={b.id} label={b.text} /></h2>);
    else if (b.type === "h3") out.push(<h3 key={i}>{b.text}</h3>);
    else if (b.type === "title") out.push(<p key={i} className="font-sans text-xl font-bold text-navy-800 dark:text-white">{b.text}</p>);
    else if (b.type === "industry") out.push(<p key={i} className="font-sans text-sm"><span className="font-semibold text-gold-700 dark:text-gold-300">Industry: </span>{b.text}</p>);
    else if (b.type === "figure") out.push(<Figure key={i} block={b} />);
    else if (b.type === "table") out.push(<ResponsiveTable key={i} rows={b.rows} />);
    else if (b.type === "callout") out.push(<Callout key={i} block={b} warn={/privacy/i.test(b.title)} />);
    else if (b.type === "features") out.push(<Features key={i} rows={b.rows} />);
    else if (b.type === "tech") out.push(<Tech key={i} rows={b.rows} />);
    else if (b.type === "steps") out.push(<Steps key={i} steps={b.steps} caption={b.caption} />);
    else if (b.type === "research") out.push(<Research key={i} entries={b.entries} />);
    else if (b.type === "sources") out.push(<Sources key={i} entries={b.entries} />);
  }
  return <div className="prose-doc">{out}</div>;
}
