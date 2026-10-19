# rednotosave

RedNote (Xiaohongshu) video and photo downloader. Paste a post link and get the
original HD file without the watermark, or every image from a carousel post.

## Features

- Watermark-free video, fetched from the original source file
- Best available resolution
- Carousel posts: every image saved in one place
- No signup, no app, nothing stored

## Supported links

Post links from `xiaohongshu.com`, `xhslink.com` and `rednote.com`, including
shared text that contains a link. Private, deleted or region-restricted posts
cannot be fetched.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Other scripts:

```sh
npm run build     # production build
npm run test      # unit tests
npm run lint      # ESLint
npm run format    # Prettier
```

## Layout

```
src/
  lib/        server function that resolves a post link, i18n dictionaries, helpers
  routes/     pages and the root layout
  test/       tests
public/       static files
```

## Interface languages

English, French, Spanish, Arabic (right-to-left) and Chinese. All copy lives in
`src/lib/i18n.ts`.

## Notes

rednotosave is not affiliated with RedNote or Xiaohongshu. Download content for
personal use or with the creator's permission.
