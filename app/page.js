import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lightbulb, Scale, Trophy, FlaskConical } from "lucide-react";
import { site } from "@/data/site";
import { section, blockOf, bodyRows, ideaSections, ideaTitle, ideaIndustry, ideaOverview } from "@/lib/content";
import TypingLine from "@/components/ui/TypingLine";
import { Callout, Steps } from "@/components/research/Blocks";
import ResponsiveTable from "@/components/research/ResponsiveTable";
import { ZayanLogo } from "@/components/ui/Logo";

const H2 = ({ id, children, sub }) => (<><h2 id={id} className="font-serif text-3xl font-bold text-navy-800 dark:text-white">{children}</h2>{sub && <p className="mt-2 max-w-[70ch] leading-7">{sub}</p>}</>);
const wrap = "mx-auto max-w-[90rem] px-4 py-10 sm:px-6";
const imgs = ["/images/ideas/it-academy.jpg", "/images/ideas/clinic.jpg", "/images/ideas/retail.jpg"];

export default function Home() {
  const intro = section(1).blocks.filter((b) => b.type === "p");
  const ideas = bodyRows(1);
  const method = blockOf(1, "callout");
  const recommended = blockOf(6, "callout");
  const closing = section(6).blocks.filter((b) => b.type === "p");
  const ratings = blockOf(6, "table").rows;
  const retailFlow = blockOf(4, "steps");

  return (
    <>
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white">
        <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          <div>
            <p className="hero-rise text-sm font-semibold text-gold-300">{site.shortTitle} · {site.program} · {site.organization}</p>
            <h1 className="hero-rise-2 mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">{site.title}</h1>
            <p className="hero-rise-2 mt-4 max-w-[54ch] text-lg text-slate-200">{site.subtitle}</p>
            <div className="hero-rise-3">
              <TypingLine lines={["Smart IT Academy Management System", "Clinic Management & Appointment Booking System", "Retail Shop Inventory & Stock Management System", "Compared, rated and prioritised"]} />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/ideas" className="btn btn-primary">Explore the Ideas <ArrowRight size={16} aria-hidden /></Link>
                <Link href="/workflow" className="btn btn-ghost">Proposed Workflows</Link>
                <Link href="/compare" className="btn btn-ghost">Comparison</Link>
              </div>
            </div>
          </div>
          <div className="hero-rise-3 rounded-xl border border-white/15 bg-white/5 p-5">
            <ZayanLogo height={40} />
            <dl className="mt-4 divide-y divide-white/10 text-sm">
              {site.overview.map(([k, v]) => <div key={k} className="grid gap-1 py-2 sm:grid-cols-[9rem_1fr]"><dt className="text-gold-300">{k}</dt><dd className="font-medium">{v}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <section className={wrap}>
        <Callout block={{ title: "Research and planning report", text: "No system described here has been built or deployed. All features, workflows and technologies are proposals." }} />
      </section>

      <section className={wrap} aria-labelledby="intro">
        <H2 id="intro"><Lightbulb className="mr-2 inline text-gold-600" size={26} aria-hidden />Introduction</H2>
        <div className="mt-3 max-w-[75ch] space-y-4 font-serif text-lg leading-8">{intro.map((p) => <p key={p.text}>{p.text}</p>)}</div>
      </section>

      <section className={wrap} aria-labelledby="ideas">
        <H2 id="ideas" sub="Three practical project ideas, each presented as a concept for future evaluation and development.">The three project ideas</H2>
        <ul className="mt-6 grid gap-5 lg:grid-cols-3">
          {ideas.map(([n, name, industry, purpose], i) => (
            <li key={n} className="card flex flex-col overflow-hidden">
              <Image src={imgs[i]} alt="" width={1000} height={650} className="h-44 w-full object-cover" sizes="(min-width: 1024px) 30rem, 100vw" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold text-gold-600 dark:text-gold-300">PROJECT IDEA #{n}</p>
                <h3 className="mt-1 text-lg font-semibold text-navy-800 dark:text-white">{name}</h3>
                <p className="mt-2 text-sm leading-6"><span className="font-semibold">Industry: </span>{industry}</p>
                <p className="mt-1 flex-1 text-sm leading-6"><span className="font-semibold">Core purpose: </span>{purpose}</p>
                <Link href={`/ideas#idea-${n}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 underline underline-offset-4 dark:text-gold-300">Read the concept <ArrowRight size={14} aria-hidden /></Link>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8"><Callout block={method} /></div>
      </section>

      <section className={wrap} aria-labelledby="flow">
        <H2 id="flow" sub="Every idea comes with a five-step proposed workflow. The retail inventory workflow is shown here; all three are on the workflow page."><FlaskConical className="mr-2 inline text-gold-600" size={26} aria-hidden />Proposed workflow, for example</H2>
        <Steps steps={retailFlow.steps} caption={retailFlow.caption} label="Retail Shop Inventory & Stock Management System" />
        <Link href="/workflow" className="btn btn-outline">See all three workflows</Link>
      </section>

      <section className={wrap} aria-labelledby="rate">
        <H2 id="rate" sub={closing[0].text}><Scale className="mr-2 inline text-gold-600" size={26} aria-hidden />Rated against seven criteria</H2>
        <ResponsiveTable rows={ratings} />
      </section>

      <section className={wrap} aria-labelledby="rec">
        <H2 id="rec"><Trophy className="mr-2 inline text-gold-600" size={26} aria-hidden />Recommended priority</H2>
        <Callout block={recommended} />
        <p className="max-w-[75ch] font-serif text-lg leading-8">{closing[closing.length - 1].text}</p>
        <Link href="/docs/6-conclusion-and-recommended-priority" className="btn btn-outline mt-4">Read the full conclusion</Link>
      </section>

    </>
  );
}
