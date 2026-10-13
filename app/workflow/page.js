import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Steps } from "@/components/research/Blocks";
import { ideaSections, ideaTitle, blockOf } from "@/lib/content";

export const metadata = { title: "Proposed workflows", description: "The proposed five-step workflow for each of the three project ideas. Concept diagrams, not screenshots of working software." };

export default function Workflow() {
  return (
    <div className="mx-auto max-w-[90rem] px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Workflows" }]} />
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">Proposed workflows</h1>
      <p className="mt-3 max-w-[65ch] font-serif text-lg leading-8">One basic five-step workflow per idea. These are concept diagrams, not screenshots of working software.</p>
      {ideaSections.map((s, i) => { const st = blockOf(s.number, "steps"); return <section key={s.id}><h2 className="mt-10 font-sans text-2xl font-bold text-navy-800 dark:text-white">#{i + 1} {ideaTitle(s.number)}</h2><Steps steps={st.steps} caption={st.caption} label={`${s.number}.9 Basic Workflow (Proposed)`} /></section>; })}
    </div>
  );
}
