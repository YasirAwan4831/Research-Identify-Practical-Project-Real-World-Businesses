import "@/styles/globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import { site } from "@/data/site";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(base),
  icons: { icon: "/logo/my-logo.jpeg" },
  title: {
    default: `${site.title} | ${site.author}`,
    template: "%s | Internship Task #04",
  },
  description: site.description,
  authors: [{ name: site.author }],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.title} | ${site.author}`,
    description: site.description,
    type: "website",
    siteName: site.shortTitle,
    images: [{ url: "/images/profile.jpg", alt: "Muhammad Yasir" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.title} | ${site.author}`,
    description: site.description,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f16" },
  ],
};

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-white text-slate-800 antialiased dark:bg-navy-950 dark:text-slate-100">
        {/* Skip link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-lg focus:bg-gold-500 focus:px-3.5 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-950 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
        >
          Skip to content
        </a>

        {/* Fixed backdrop accents (subtle, behind everything) */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
        >
          <div className="absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-gold-400/[0.06] blur-3xl dark:bg-gold-500/[0.07]" />
          <div className="absolute bottom-0 right-0 h-80 w-[36rem] rounded-full bg-navy-400/[0.05] blur-3xl dark:bg-navy-600/[0.10]" />
        </div>

        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}