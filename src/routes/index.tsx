import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { dict, languages, type Lang } from "@/lib/i18n";
import { resolveRednote, type RednoteResult } from "@/lib/rednote.functions";
import headerIcon from "@/assets/header-icon.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "rednotosave – RedNote Video Downloader, No Watermark" },
      { name: "description", content: "rednotosave downloads RedNote (Xiaohongshu) videos and photos in HD without watermark. Paste a link, click download. Free, no signup." },
      { property: "og:title", content: "rednotosave – RedNote Video Downloader, No Watermark" },
      { property: "og:description", content: "Save RedNote videos and photos in HD, watermark-free, in one click." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const resolve = useServerFn(resolveRednote);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RednoteResult | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && saved in dict) setLang(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const t = dict[lang];
  const steps = t.steps.map(([tt, d], i) => ({ n: String(i + 1), t: tt, d }));
  const features = t.features.map(([tt, d]) => ({ t: tt, d }));
  const faqs = t.faqs.map(([q, a]) => ({ q, a }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true); setError(null); setResult(null);
    try {
      setResult(await resolve({ data: { url, lang } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function paste() {
    try { setUrl(await navigator.clipboard.readText()); } catch { /* ignore */ }
  }

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <img src={headerIcon.url} alt="" className="h-9 w-9 shadow-glow" />
          {"redonotosave"}
        </a>
        <div className="flex items-center gap-8">
          <nav className="hidden gap-8 text-sm text-muted-foreground sm:flex">
            <a href="#how" className="hover:text-foreground">{t.nav[0]}</a>
            <a href="#features" className="hover:text-foreground">{t.nav[1]}</a>
            <a href="#faq" className="hover:text-foreground">{t.nav[2]}</a>
          </nav>
          <select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value as Lang)}
            className="h-9 cursor-pointer rounded-lg border bg-card px-2 text-sm font-medium outline-none focus:ring-2 focus:ring-ring">
            {languages.map((l) => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
          </select>
        </div>
      </header>

      <section className="bg-hero px-6 pb-20 pt-14 text-center">
        <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
          {t.badge}
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          {t.h1a} <span className="text-primary">{t.h1b}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          {t.sub}
        </p>

        <form onSubmit={submit} className="mx-auto mt-10 max-w-2xl rounded-2xl border bg-card p-2 shadow-card">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t.placeholder}
                className="h-14 w-full rounded-xl bg-transparent px-4 pr-20 rtl:pl-20 rtl:pr-4 text-base outline-none placeholder:text-muted-foreground"
              />
              <button type="button" onClick={paste}
                className="absolute right-2 rtl:left-2 rtl:right-auto top-1/2 -translate-y-1/2 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-accent">
                {t.paste}
              </button>
            </div>
            <button disabled={loading}
              className="h-14 rounded-xl bg-brand px-8 font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-60">
              {loading ? t.fetching : t.download}
            </button>
          </div>
        </form>

        {error && (
          <p className="mx-auto mt-5 max-w-2xl rounded-xl bg-primary-soft px-4 py-3 text-sm text-destructive">{error}</p>
        )}

        {result && (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border bg-card p-5 text-start shadow-card animate-in fade-in slide-in-from-bottom-2">
            <div className="flex gap-4">
              {result.cover && (
                <img src={result.cover} alt="" referrerPolicy="no-referrer" className="h-28 w-24 shrink-0 rounded-xl object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-success">{t.ready}</p>
                <h3 className="mt-1 line-clamp-2 font-semibold">{result.title}</h3>
                {result.videoUrl && (
                  <a href={result.videoUrl} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer"
                    className="mt-4 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                    {t.dlVideo}
                  </a>
                )}
                {result.videoUrl && (
                  <p className="mt-2 text-xs text-muted-foreground">{t.saveHint}</p>
                )}
              </div>
            </div>
            {result.images.length > 0 && (
              <div className="mt-5 grid grid-cols-3 gap-2">
                {result.images.map((src, i) => (
                  <a key={src} href={src} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer" className="group relative">
                    <img src={src} alt={`Image ${i + 1}`} referrerPolicy="no-referrer" className="aspect-square w-full rounded-lg object-cover" />
                    <span className="absolute inset-x-1 bottom-1 rounded-md bg-card/90 py-1 text-center text-xs font-semibold opacity-0 transition group-hover:opacity-100">{t.save}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold">{t.howTitle}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border bg-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-display font-bold text-accent-foreground">{s.n}</span>
              <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="bg-secondary px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold">{t.featTitle}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.t} className="rounded-2xl bg-card p-6 shadow-card">
                <div className="h-1.5 w-10 rounded-full bg-brand" />
                <h3 className="mt-4 font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold">{t.faqTitle}</h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border bg-card p-5">
              <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t px-6 py-8 text-center text-xs text-muted-foreground">
        {t.footer}
      </footer>
    </div>
  );
}
