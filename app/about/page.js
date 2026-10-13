import Image from "next/image";
import { Globe, Github, Linkedin, Twitter } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { site, socials } from "@/data/site";

export const metadata = {
  title: "About",
  description: `About ${site.author}, author of this research and planning report.`,
};

const icons = { github: Github, linkedin: Linkedin, twitter: Twitter, globe: Globe };

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "About" }]} />
      <p className="section-eyebrow">About the author</p>
      <h1 className="section-title">Meet {site.author}</h1>
      <p className="section-lead">Author of this research and planning report.</p>

      <section className="card mt-8 overflow-hidden" aria-label="Author profile">
        <div className="grid md:grid-cols-[18rem_1fr]">
          <Image
            src="/images/profile.jpg"
            alt={site.author}
            width={1200}
            height={800}
            className="h-72 w-full object-cover md:h-full"
            sizes="(min-width: 768px) 18rem, 100vw"
          />
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="badge-gold rounded-full border px-3 py-1 text-xs font-semibold">{site.program}</span>
              <span className="badge-gold rounded-full border px-3 py-1 text-xs font-semibold">{site.organization}</span>
            </div>
            <h2 className="mt-4 font-serif text-2xl font-bold text-navy-800 dark:text-white">{site.author}</h2>
            <p className="mt-3 max-w-[60ch] leading-7">
              Prepared this research and planning report as Internship Task #04 in the AI Automation domain at {site.organization}, submitted on {site.submitted}.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((social) => {
                const Icon = icons[social.icon];
                return (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                      <Icon size={16} aria-hidden />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
