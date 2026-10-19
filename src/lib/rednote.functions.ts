import { createServerFn } from "@tanstack/react-start";

export type RednoteResult = {
  title: string;
  cover: string | null;
  videoUrl: string | null;
  images: string[];
};

const ALLOWED = /(^|\.)(xiaohongshu\.com|xhslink\.com|rednote\.com)$/i;

function decode(s: string) {
  return s.replace(/\\u002F/g, "/").replace(/\\\//g, "/").replace(/&amp;/g, "&");
}

export const resolveRednote = createServerFn({ method: "POST" })
  .inputValidator((d: { url: string }) => {
    const match = String(d?.url ?? "").match(/https?:\/\/[^\s"'<>]+/);
    if (!match) throw new Error("Please paste a valid RedNote link.");
    const u = new URL(match[0]);
    if (!ALLOWED.test(u.hostname)) throw new Error("Only RedNote / Xiaohongshu links are supported.");
    return { url: u.toString() };
  })
  .handler(async ({ data }): Promise<RednoteResult> => {
    const res = await fetch(data.url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8",
      },
    });
    if (!res.ok) throw new Error(`Couldn't open that post (status ${res.status}).`);
    const finalHost = new URL(res.url).hostname;
    if (!ALLOWED.test(finalHost)) throw new Error("That link doesn't lead to a RedNote post.");
    const html = await res.text();

    const meta = (name: string) =>
      html.match(new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]+content="([^"]*)"`, "i"))?.[1] ?? null;

    const masters = [...html.matchAll(/"masterUrl":"([^"]+)"/g)].map((m) => decode(m[1]));
    const videoUrl = masters[0] ?? (meta("og:video") ? decode(meta("og:video")!) : null);

    const images = Array.from(
      new Set(
        [...html.matchAll(/"urlDefault":"([^"]+)"/g)].map((m) => decode(m[1]).replace(/^http:/, "https:")),
      ),
    ).slice(0, 18);

    const title = decode(meta("og:title") ?? html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "RedNote post")
      .replace(/ - 小红书$/, "");
    const cover = meta("og:image") ? decode(meta("og:image")!) : images[0] ?? null;

    if (!videoUrl && images.length === 0)
      throw new Error("No media found. The post may be private or removed.");

    return { title, cover, videoUrl: videoUrl?.replace(/^http:/, "https:") ?? null, images: videoUrl ? [] : images };
  });
