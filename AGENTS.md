<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# rednotosave

## Rules

- The brand name is `rednotosave`, always written lowercase. Keep it identical in the site header, page titles, meta tags, and the dictionaries in `src/lib/i18n.ts`.
- Every user-facing string lives in `src/lib/i18n.ts`. Add new copy to all five languages (en, fr, es, ar, zh) in the same change; Arabic renders right-to-left.
- Only `xiaohongshu.com`, `xhslink.com` and `rednote.com` links are accepted. Keep the host allow-list and its error message in `src/lib/rednote.functions.ts` in sync.
- Keep the CSRF middleware in `src/start.ts`; removing it leaves server functions open to cross-site requests.
- Do not add third-party telemetry, analytics or error-reporting services. Failures are logged to the server console only.
- Server functions must stay in `*.functions.ts` modules so they are not bundled into the browser build.
