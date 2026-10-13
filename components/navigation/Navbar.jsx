"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { MyLogo } from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Search from "./Search";

const special = nav.map((n) => n.href).filter((h) => h.startsWith("/docs/"));
const isActive = (path, href) => {
  if (href === "/") return path === "/";
  if (href === "/docs") return path.startsWith("/docs") && !special.includes(path);
  return path === href || path.startsWith(href + "/");
};

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow + tighter bg on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [path]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkCls = (href) =>
    isActive(path, href)
      ? "text-navy-800 dark:text-gold-300"
      : "text-slate-600 hover:text-navy-800 dark:text-slate-200 dark:hover:text-white";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/85 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-navy-950/85 dark:shadow-black/20"
          : "border-transparent bg-white/70 backdrop-blur-md dark:bg-navy-950/70"
      }`}
    >
      {/* Top accent line */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
      />

      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-3 px-4 sm:px-6">
        {/* ── Brand ───────────────────────────────────────── */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 font-semibold text-navy-800 transition-colors hover:bg-slate-100/70 dark:text-white dark:hover:bg-white/5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400/25 to-gold-600/10 ring-1 ring-gold-400/30 transition-transform duration-200 group-hover:scale-105">
            <MyLogo size={24} />
          </span>
          <span className="hidden text-sm tracking-tight sm:inline">
            {site.shortTitle}
          </span>
        </Link>

        {/* ── Desktop nav ─────────────────────────────────── */}
        <nav
          aria-label="Main"
          className="ml-4 hidden flex-1 items-center gap-1 lg:flex"
        >
          {nav.map((n) => {
            const active = isActive(path, n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`group relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${linkCls(
                  n.href
                )}`}
              >
                <span
                  className={`absolute inset-0 -z-10 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-gold-500/10 dark:bg-gold-400/10"
                      : "bg-transparent group-hover:bg-slate-100/70 dark:group-hover:bg-white/5"
                  }`}
                />
                {n.label}
                {/* Active underline */}
                <span
                  aria-hidden
                  className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold-500 transition-all duration-300 dark:bg-gold-400 ${
                    active
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* ── Right controls ──────────────────────────────── */}
        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <Search />
          <ThemeToggle />

          {/* Mobile toggle */}
          <button
            type="button"
            className="rounded-lg border border-transparent p-2 text-slate-600 transition-all duration-200 hover:border-slate-200 hover:bg-slate-100 dark:text-slate-200 dark:hover:border-white/10 dark:hover:bg-white/5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="relative block h-5 w-5">
              <Menu
                size={20}
                aria-hidden
                className={`absolute inset-0 transition-all duration-200 ${
                  open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />
              <X
                size={20}
                aria-hidden
                className={`absolute inset-0 transition-all duration-200 ${
                  open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-out dark:border-white/10 dark:bg-navy-950/95 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="px-4 py-3 sm:px-6">
          <ul className="grid gap-1">
            {nav.map((n) => {
              const active = isActive(path, n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 ${
                      active
                        ? "bg-gold-500/10 font-semibold text-navy-800 dark:bg-gold-400/10 dark:text-gold-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-navy-800 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        active
                          ? "bg-gold-500 dark:bg-gold-400"
                          : "bg-slate-300 group-hover:bg-gold-400/60 dark:bg-slate-600"
                      }`}
                    />
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Backdrop for mobile menu (optional visual separation) */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-16 z-[-1] cursor-default bg-black/20 backdrop-blur-[2px] lg:hidden"
        />
      )}
    </header>
  );
}