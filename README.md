# T.C.O.A Photography

My photography site. Plain HTML, CSS and JavaScript, hosted on Cloudflare.

## Adding a photo

1. Copy the full-size photo from your camera or phone into `images/originals/`.
2. Run the converter (you need Python with Pillow, `pip install Pillow`):

   ```
   python scripts/optimize_images.py
   ```

   It makes two WebP files in `images/`. A photo called `beach day.jpg` becomes
   `beach-day.webp` (2000px, for banners and the lightbox) and `beach-day-sm.webp`
   (900px, for the grid and phones). Spaces turn into hyphens and letters go lowercase.
   Photos it has already converted are skipped.

3. Paste the right snippet into the page and change the name and alt text.

   Gallery grid (`gallery.html`, inside `.gallery__grid`). Set `data-category` to
   `portrait`, `landscape` or `creative` so the filter buttons work:

   ```html
   <div class="gallery__item reveal-up" data-category="portrait">
       <img src="images/beach-day-sm.webp" srcset="images/beach-day-sm.webp 900w, images/beach-day.webp 2000w" sizes="(max-width: 640px) 50vw, 25vw" data-full="images/beach-day.webp" loading="lazy" decoding="async" alt="Beach day">
       ...keep the rest of the item markup as it is...
   </div>
   ```

   Creativity grid, the About photo, or any other photo in the page body:

   ```html
   <img src="images/beach-day.webp" srcset="images/beach-day-sm.webp 900w, images/beach-day.webp 2000w" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" decoding="async" alt="Beach day">
   ```

   Banner at the top of a page (the first big photo people see). Leave out
   `loading="lazy"` here, because this one should load first:

   ```html
   <img src="images/beach-day.webp" srcset="images/beach-day-sm.webp 900w, images/beach-day.webp 2000w" sizes="100vw" fetchpriority="high" decoding="async" alt="Beach day">
   ```

If you swap a photo for a different one, give the new file a new name (for example
`g5-v2.jpg`). Browsers keep photos cached for 30 days (see `_headers`), so reusing an
old name means some visitors keep seeing the old picture.

The originals in `images/originals/` never go on the live site. `.assetsignore`
keeps them out, along with the scripts and these notes.

## Previewing locally

```
npx wrangler dev
```

Then open http://localhost:8787. This serves the site the same way Cloudflare does,
including clean URLs like `/about`.

## Deploying to Cloudflare

You need a free Cloudflare account and Node.js.

First deploy from your own computer:

```
npx wrangler login
npx wrangler deploy
```

The site goes live at `https://tcoaphotography.<your-subdomain>.workers.dev`. Run
`npx wrangler deploy` again whenever you change something.

If you later put the project on GitHub, you can connect the repo in the Cloudflare
dashboard (Workers & Pages, then your `tcoaphotography` Worker, then Settings and
Builds). After that, every push deploys by itself.

Once the Cloudflare site looks right, you can delete the Netlify site, or keep it a
while as a backup.
