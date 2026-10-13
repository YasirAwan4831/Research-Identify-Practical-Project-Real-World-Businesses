import Link from "next/link";
import { Github, Linkedin, Twitter, Globe, ArrowUpRight } from "lucide-react";
import { nav, site, socials, previousProjects } from "@/data/site";
import { ZayanLogo } from "@/components/ui/Logo";

const icons = { github: Github, linkedin: Linkedin, twitter: Twitter, globe: Globe };
const AUTHOR_URL = "https://yasirawan4831.github.io/futuristic-links-dashboard/";

export default function Footer() {
  return (
    <footer className="mt-20 bg-navy-900 text-slate-300">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        {/* ── Brand / Project ─────────────────────────────── */}
        <div className="space-y-2">
          <ZayanLogo height={44} />
          <p className="pt-2 text-sm font-semibold text-white">Project</p>
          <p className="text-sm">{site.shortTitle}</p>
          <p className="text-sm">{site.title}</p>
          <a
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-200 underline decoration-gold-400/40 underline-offset-4 transition-colors hover:text-gold-300 hover:decoration-gold-400"
          >
            {site.author}
            <ArrowUpRight size={13} aria-hidden />
          </a>
        </div>

        {/* ── Internship / Connect ────────────────────────── */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">Internship</p>
          <p className="text-sm">{site.program}</p>
          <p className="text-sm">{site.organization}</p>
          <p className="text-sm italic text-gold-300">{site.tagline}</p>

          <p className="pt-3 text-sm font-semibold text-white">Connect</p>
          <ul className="flex gap-2">
            {socials.map((s) => {
              const Icon = icons[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-500 hover:text-white hover:shadow-lg hover:shadow-gold-500/30"
                  >
                    <Icon
                      size={18}
                      aria-hidden
                      className="transition-transform duration-200 group-hover:scale-110"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Navigation ──────────────────────────────────── */}
        <nav aria-label="Footer">
          <p className="mb-2 text-sm font-semibold text-white">Navigation</p>
          <ul className="space-y-1 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="group inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-white"
                >
                  <span className="h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-3" />
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Previous projects ───────────────────────────── */}
        <div>
          <p className="mb-2 text-sm font-semibold text-white">Previous projects</p>
          <ul className="space-y-2 text-sm">
            {previousProjects.map((p) => (
              <li key={p.href}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 transition-colors duration-150 hover:text-white"
                >
                  <span className="border-b border-transparent pb-px transition-colors duration-200 group-hover:border-gold-400/60">
                    {p.label}
                  </span>
                  <ArrowUpRight
                    size={14}
                    aria-hidden
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-300"
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs">
            Separate projects, not part of Internship Task #04.
          </p>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div className="border-t border-white/10 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-2 text-xs sm:flex-row">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <a
              href={AUTHOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-200 underline decoration-gold-400/40 underline-offset-4 transition-colors hover:text-gold-300 hover:decoration-gold-400"
            >
              {site.author}
            </a>
            . All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-center sm:text-right">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
            Research and planning report. Nothing described here has been built or deployed.
          </p>
        </div>
      </div>
    </footer>
  );
}