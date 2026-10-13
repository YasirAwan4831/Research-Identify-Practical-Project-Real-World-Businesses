import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ResponsiveTable from "@/components/research/ResponsiveTable";
import { Callout } from "@/components/research/Blocks";
import { section, blockOf } from "@/lib/content";

export const metadata = { title: "Comparison and priority", description: "Qualitative comparison of the three project ideas, seven-criteria rating and the recommended starting point." };

export default function Compare() {
  const intro5 = section(5).blocks.find((b) => b.type === "p").text;
  const ps = section(6).blocks.filter((b) => b.type === "p").map((b) => b.text);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Comparison" }]} />
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">Comparison and recommended priority</h1>
      <h2 className="mt-10 font-sans text-2xl font-bold text-navy-800 dark:text-white">5. Comparative analysis</h2>
      <p className="mt-2 max-w-[70ch] leading-7">{intro5}</p>
      <ResponsiveTable rows={blockOf(5, "table").rows} />
      <h2 className="mt-12 font-sans text-2xl font-bold text-navy-800 dark:text-white">6. Conclusion and recommended priority</h2>
      <p className="mt-2 max-w-[70ch] leading-7">{ps[0]}</p>
      <ResponsiveTable rows={blockOf(6, "table").rows} />
      <Callout block={blockOf(6, "callout")} />
      <p className="max-w-[70ch] leading-7">{ps[1]}</p>
      <p className="mt-4 text-sm"><Link className="font-semibold underline underline-offset-4" href="/docs/5-comparative-analysis">Read these sections in the documentation</Link></p>
    </div>
  );
}
