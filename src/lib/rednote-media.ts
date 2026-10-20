type RecordValue = Record<string, unknown>;

function record(value: unknown): RecordValue | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as RecordValue : null;
}

// Parse JSON-like page state without evaluating JavaScript from the remote page.
function pageStates(html: string): RecordValue[] {
  const states: RecordValue[] = [];
  for (const script of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    const text = script[1] ?? "";
    const assignment = /(?:window\.)?__(?:INITIAL_STATE|NEXT_DATA)__\s*=\s*/g.exec(text);
    const start = assignment ? text.indexOf("{", assignment.index + assignment[0].length) : -1;
    if (start < 0) continue;
    let depth = 0, quoted = false, escaped = false;
    for (let i = start; i < text.length; i++) {
      const char = text[i];
      if (quoted) {
        if (escaped) escaped = false;
        else if (char === "\\") escaped = true;
        else if (char === '"') quoted = false;
      } else if (char === '"') quoted = true;
      else if (char === "{") depth++;
      else if (char === "}" && --depth === 0) {
        try {
          const json = text.slice(start, i + 1).replace(/"(?:\\.|[^"\\])*"|\bundefined\b/g,
            (token) => token === "undefined" ? "null" : token);
          const state = record(JSON.parse(json));
          if (state) states.push(state);
        } catch { /* Unrecognized state is not a reason to serve a stamped fallback. */ }
        break;
      }
    }
  }
  return states;
}

export function originalVideoFromHtml(html: string, postUrl: string): string | null {
  const postId = new URL(postUrl).pathname.match(/\/(?:explore|item)\/([a-z0-9]+)/i)?.[1];
  for (const state of pageStates(html)) {
    const notes = record(state["note"]);
    const details = record(notes?.["noteDetailMap"]);
    const currentId = postId ?? (typeof notes?.["currentNoteId"] === "string" ? notes["currentNoteId"] : null);
    let note: RecordValue | null = null;
    if (details) {
      const keys = Object.keys(details);
      const selected = currentId ? details[currentId] : keys.length === 1 ? details[keys[0] ?? ""] : null;
      note = record(record(selected)?.["note"]);
    }
    note ??= record(record(state["global"])?.["noteData"]);
    note ??= record(state["noteData"]);
    if (postId && typeof note?.["noteId"] === "string" && note["noteId"] !== postId) continue;
    const video = record(note?.["video"]);
    const key = record(video?.["consumer"])?.["originVideoKey"];
    if (typeof key !== "string" || !/^[a-z0-9_][a-z0-9_./-]*$/i.test(key) || key.includes("..")) continue;
    return `https://sns-video-bd.xhscdn.com/${key}`;
  }
  // masterUrl, video.url and og:video do not establish a watermark-free source.
  return null;
}

export function hasVideoInHtml(html: string): boolean {
  return /"(?:masterUrl|originVideoKey)"\s*:|(?:property|name)=["']og:video["']|"type"\s*:\s*"video"/i.test(html);
}