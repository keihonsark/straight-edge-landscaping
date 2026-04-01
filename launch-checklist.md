# Launch Checklist — New Client Site

Update every value in `src/config.js` before deploying a new client site.

## Business Info (`config.business`)

- [ ] `name` — Full legal business name (e.g. "ABC Landscaping LLC")
- [ ] `shortName` — Short display name (e.g. "ABC Landscaping")
- [ ] `tagline` — Hero subheadline / elevator pitch
- [ ] `phone` — Formatted phone number (e.g. "(555) 123-4567")
- [ ] `phoneTel` — Digits-only phone for tel: links (e.g. "5551234567")
- [ ] `address` — Display address (e.g. "Austin, TX")
- [ ] `city` — Primary city name
- [ ] `state` — Two-letter state code
- [ ] `region` — Regional name (e.g. "Central Texas", "Bay Area")
- [ ] `serviceAreas` — Array of city names shown in tags and coverage map
- [ ] `hours` — Full hours string (e.g. "Mon – Fri: 8:00 AM – 6:00 PM")
- [ ] `hoursShort` — Abbreviated hours for footer
- [ ] `founded` — Year business was founded
- [ ] `ownerName` — Owner name or team reference used in CTA copy
- [ ] `successMessage` — Message shown after form submission
- [ ] `clientPortalUrl` — URL for client portal login
- [ ] `adminUrl` — URL for admin/backend login
- [ ] `formspreeId` — Formspree form ID for contact and estimate forms

## Google Reviews (`config.google`)

- [ ] `placeId` — Google Places ID (if applicable)
- [ ] `mapsUrl` — Google Maps listing URL
- [ ] `rating` — Overall Google rating (e.g. 4.9)
- [ ] `reviewCount` — Total number of Google reviews
- [ ] `reviews` — Array of review objects with `name` and `text` fields

## SEO (`config.seo`)

- [ ] `title` — Browser tab title / SEO title
- [ ] `description` — Meta description for search engines

## Assets (in `/public`)

- [ ] Replace `lawncare-bros-logo.png` with client logo
- [ ] Replace `hero-image.png` with client hero image
- [ ] Replace `favicon.svg` with client favicon
- [ ] Replace all service images (`01_` through `09_`) with client photos
- [ ] Replace `mulch.png` and `landscape-hardscape.png` if applicable

## Other Files to Review

- [ ] `index.html` — Update Google Maps API key if using lawn estimator
- [ ] `src/components/ChatWidget.jsx` — Update scripted responses for new client
- [ ] `src/data/blogPosts.js` — Replace blog content with client-relevant articles
- [ ] `src/components/About.jsx` — Update about section copy
- [ ] `src/components/TrustBar.jsx` — Update trust bar items
- [ ] `src/components/TrustBadges.jsx` — Update badge content
- [ ] `src/components/StatsCounter.jsx` — Update stat numbers
- [ ] `src/pages/Estimate.jsx` — Update pricing data and success message
- [ ] `src/pages/services/*.jsx` — Update service page content, FAQs, reviews
- [ ] `src/pages/LawnHealthQuiz.jsx` — Update quiz questions if needed
- [ ] Vercel / hosting — Update domain, project name, environment variables
