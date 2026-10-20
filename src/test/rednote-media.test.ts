import { describe, expect, it } from "vitest";
import { originalVideoFromHtml } from "../lib/rednote-media";

const url = "https://www.xiaohongshu.com/explore/abc123";
const state = (note: unknown) => `<script>window.__INITIAL_STATE__=${JSON.stringify({ note: { noteDetailMap: { abc123: { note } } } })}</script>`;

describe("original-only video selection", () => {
  it("uses the original source instead of a watermarked rendition", () => {
    const html = state({ video: { consumer: { originVideoKey: "original/video.mp4" }, media: { stream: { h264: [{ masterUrl: "https://example.com/stamped.mp4" }] } } } });
    expect(originalVideoFromHtml(html, url)).toBe("https://sns-video-bd.xhscdn.com/original/video.mp4");
  });
  it("never returns an unverified stamped fallback", () => {
    const html = state({ video: { media: { stream: { h264: [{ masterUrl: "https://example.com/stamped.mp4" }] } } } }) + '<meta property="og:video" content="https://example.com/stamped.mp4">';
    expect(originalVideoFromHtml(html, url)).toBeNull();
  });
  it("does not select a different post's original", () => {
    const html = `<script>window.__INITIAL_STATE__=${JSON.stringify({ note: { noteDetailMap: { other: { note: { video: { consumer: { originVideoKey: "other.mp4" } } } } } } })}</script>`;
    expect(originalVideoFromHtml(html, url)).toBeNull();
  });
  it("supports global state with undefined fields without evaluating scripts", () => {
    const html = '<script>window.__INITIAL_STATE__={"global":{"noteData":{"video":{"consumer":{"originVideoKey":"original.mp4"}}}},"optional":undefined};</script>';
    expect(originalVideoFromHtml(html, url)).toBe("https://sns-video-bd.xhscdn.com/original.mp4");
  });
  it("rejects unsafe source keys", () => {
    expect(originalVideoFromHtml(state({ video: { consumer: { originVideoKey: "../other.mp4" } } }), url)).toBeNull();
  });
});