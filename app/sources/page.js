import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Sources, Callout } from "@/components/research/Blocks";
import { section, blockOf } from "@/lib/content";

export const metadata = { title: "Research sources", description: "The seven official product pages reviewed for this report, with relevance and access date." };

export default function SourcesPage() {
  const note = section(7).blocks.find((b) => b.type === "note").text;
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Sources" }]} />
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">Research sources</h1>
      <Callout block={blockOf(1, "callout")} />
      <Sources entries={blockOf(7, "sources").entries} />
      <p className="max-w-[70ch] text-sm italic leading-6">{note}</p>
      <p className="mt-4 text-sm"><Link className="font-semibold underline underline-offset-4" href="/docs/7-research-sources">Read this section in the documentation</Link></p>
    </div>
  );
}
