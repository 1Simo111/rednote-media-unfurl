import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { resolveRednote, type RednoteResult } from "@/lib/rednote.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RedNote Video Downloader – No Watermark, Free & Fast" },
      { name: "description", content: "Download RedNote (Xiaohongshu) videos and photos in HD without watermark. Paste a link, click download. Free, no signup." },
      { property: "og:title", content: "RedNote Video Downloader – No Watermark" },
      { property: "og:description", content: "Save RedNote videos and photos in HD, watermark-free, in one click." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { n: "1", t: "Copy the link", d: "In RedNote, tap Share → Copy link on any video or photo post." },
  { n: "2", t: "Paste it here", d: "Drop the link (or the whole shared text) into the box above." },
  { n: "3", t: "Download", d: "Get the original HD file — clean, with no watermark." },
];

const features = [
  { t: "No watermark", d: "We fetch the original source file, not the stamped export." },
  { t: "HD quality", d: "Download videos in the best resolution available." },
  { t: "Photos too", d: "Save every image from carousel posts in one place." },
  { t: "Free & private", d: "No signup, no app, nothing stored on our side." },
];

const faqs = [
  { q: "Is it free?", a: "Yes. Paste as many links as you like." },
  { q: "Which links work?", a: "xiaohongshu.com, xhslink.com and rednote.com post links, including shared text that contains a link." },
  { q: "Why did my link fail?", a: "The post may be private, deleted, or region-restricted. Try copying the link again." },
  { q: "Can I re-upload downloaded content?", a: "Please respect creators. Only download content for personal use or with permission." },
];

function Index() {
  const resolve = useServerFn(resolveRednote);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RednoteResult | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true); setError(null); setResult(null);
    try {
      setResult(await resolve({ data: { url } }));
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
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-primary-foreground shadow-glow">↓</span>
          RedSave
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground sm:flex">
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
      </header>

      <section className="bg-hero px-6 pb-20 pt-14 text-center">
        <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
          Free · No watermark · HD
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          RedNote Video Downloader <span className="text-primary">without watermark</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Paste a RedNote link and save the original video or photos in seconds.
        </p>

        <form onSubmit={submit} className="mx-auto mt-10 max-w-2xl rounded-2xl border bg-card p-2 shadow-card">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste RedNote link here…"
                className="h-14 w-full rounded-xl bg-transparent px-4 pr-20 text-base outline-none placeholder:text-muted-foreground"
              />
              <button type="button" onClick={paste}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-accent">
                Paste
              </button>
            </div>
            <button disabled={loading}
              className="h-14 rounded-xl bg-brand px-8 font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-60">
              {loading ? "Fetching…" : "Download"}
            </button>
          </div>
        </form>

        {error && (
          <p className="mx-auto mt-5 max-w-2xl rounded-xl bg-primary-soft px-4 py-3 text-sm text-destructive">{error}</p>
        )}

        {result && (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border bg-card p-5 text-left shadow-card animate-in fade-in slide-in-from-bottom-2">
            <div className="flex gap-4">
              {result.cover && (
                <img src={result.cover} alt="" referrerPolicy="no-referrer" className="h-28 w-24 shrink-0 rounded-xl object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-success">Ready</p>
                <h3 className="mt-1 line-clamp-2 font-semibold">{result.title}</h3>
                {result.videoUrl && (
                  <a href={result.videoUrl} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer"
                    className="mt-4 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                    Download video (HD, no watermark)
                  </a>
                )}
                {result.videoUrl && (
                  <p className="mt-2 text-xs text-muted-foreground">If it opens in a player, right-click or long-press → Save video.</p>
                )}
              </div>
            </div>
            {result.images.length > 0 && (
              <div className="mt-5 grid grid-cols-3 gap-2">
                {result.images.map((src, i) => (
                  <a key={src} href={src} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer" className="group relative">
                    <img src={src} alt={`Image ${i + 1}`} referrerPolicy="no-referrer" className="aspect-square w-full rounded-lg object-cover" />
                    <span className="absolute inset-x-1 bottom-1 rounded-md bg-card/90 py-1 text-center text-xs font-semibold opacity-0 transition group-hover:opacity-100">Save</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
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
          <h2 className="text-center text-3xl font-bold">Why people use RedSave</h2>
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
        <h2 className="text-center text-3xl font-bold">Questions</h2>
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
        RedSave is not affiliated with RedNote / Xiaohongshu. Please respect creators' rights.
      </footer>
    </div>
  );
}
