import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Figure, Features, Callout } from "@/components/research/Blocks";
import ResponsiveTable from "@/components/research/ResponsiveTable";
import { ideaSections, blockOf, blocksOf, ideaTitle, ideaIndustry, ideaOverview, ideaProblem } from "@/lib/content";

export const metadata = { title: "Project ideas", description: "The three proposed project ideas: Smart IT Academy Management System, Clinic Management & Appointment Booking System and Retail Shop Inventory & Stock Management System." };

export default function Ideas() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Project Ideas" }]} />
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">Project ideas</h1>
      <p className="mt-3 max-w-[65ch] font-serif text-lg leading-8">Three proposed concepts for real-world businesses. None has been built, deployed or tested as part of this assignment.</p>
      <nav aria-label="Ideas" className="mt-6 flex flex-wrap gap-2">
        {ideaSections.map((s, i) => <a key={s.id} href={`#idea-${i + 1}`} className="btn btn-outline">#{i + 1} {ideaTitle(s.number)}</a>)}
      </nav>
      {ideaSections.map((s, i) => {
        const n = s.number;
        const callout = blocksOf(n, "callout")[0];
        return (
          <section key={s.id} id={`idea-${i + 1}`} className="mt-16 scroll-mt-24" aria-labelledby={`t-${i + 1}`}>
            <p className="text-sm font-semibold text-gold-700 dark:text-gold-300">Project idea #{i + 1}</p>
            <h2 id={`t-${i + 1}`} className="font-serif text-3xl font-bold text-navy-800 dark:text-white">{ideaTitle(n)}</h2>
            <p className="mt-2 text-sm"><span className="font-semibold text-gold-700 dark:text-gold-300">Industry: </span>{ideaIndustry(n)}</p>
            <Figure block={blockOf(n, "figure")} />
            <h3 className="mt-6 font-sans text-xl font-semibold text-navy-800 dark:text-white">Overview</h3>
            <p className="mt-2 max-w-[70ch] leading-7">{ideaOverview(n)}</p>
            <h3 className="mt-6 font-sans text-xl font-semibold text-navy-800 dark:text-white">Problem statement</h3>
            <p className="mt-2 max-w-[70ch] leading-7">{ideaProblem(n)}</p>
            <h3 className="mt-6 font-sans text-xl font-semibold text-navy-800 dark:text-white">Target users</h3>
            <ResponsiveTable rows={blockOf(n, "table").rows} />
            <h3 className="font-sans text-xl font-semibold text-navy-800 dark:text-white">Key features</h3>
            <Features rows={blockOf(n, "features").rows} />
            {callout && <Callout block={callout} warn />}
            <Link href={`/docs/${s.id}`} className="btn btn-outline">Read section {n} in full</Link>
          </section>
        );
      })}
    </div>
  );
}
