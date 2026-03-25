# Critical Rules — Injected Into Every Agent Spawn

These rules MUST be included in every agent spawn prompt. They are the rules
that agents most commonly violate. ~30 lines, survives any context window.

## Component Creation Rules
1. BEFORE creating any component, run: `grep -r "Desktop" src/components/index.ts` to find reusable components
2. Headers MUST reuse DesktopSearchAutocomplete (not plain <form>) and MegaMenu (not plain <button>)
3. Storybook title for Desktop components: `'{Category} (Desktop)/{ComponentName}'` — NOT `'{Category}/{ComponentName}'`
4. `'use client'` MUST be the FIRST line of every .tsx component file, BEFORE imports
5. Named exports ONLY — no `export default`
6. `cn()` is ONLY for className merging: `className={cn(styles.root, className)}`

## Visual Rules
7. NO hover effects (no shadow, no scale, no translateY) unless explicitly requested
8. NO picsum.photos or placehold.co — use Unsplash URLs
9. Story variants MUST have genuinely different data (products, prices, states) — NOT identical data with different names
10. Card images use `object-fit: cover`, no padding on images

## Design Tokens
11. Colors via `var(--gs-*)` CSS custom properties (runtime) — NOT SCSS vars for colors
12. Spacing/breakpoints via SCSS `$token` vars (compile-time)
13. `$color-bg-page` is now `#FFFFFF` (white, not gray)

## Process Rules
14. ALWAYS use TeamCreate for multi-agent work — NEVER standalone Agent spawns
15. NEVER commit/push to `main` — use `feat/*`, `bugfix/*`, `v*` branches
16. NEVER delete files/containers without explicit permission
17. After creating/modifying ANY component: verify via Playwright screenshot
18. Read existing similar components BEFORE implementing new ones
19. When owner says "all components" or "every component" or "все" or "абсолютно все" = audit/fix EVERY SINGLE ONE. Do not scope-reduce to "components I touched". Create a checklist, track progress, report remaining count.
20. Component names on npm/GitHub must be brand-neutral — NO competitor names (AliExpress, Ozon, Uzum, Taobao) in exported identifiers, file paths, or CSS classes

## Design Rules
21. Header is CONTAINED inside max-width container — NOT full-width/edge-to-edge. Has rounded corners like the reference design.
22. When owner provides reference screenshots: match EVERY detail exactly. Compare pixel-by-pixel before committing.
23. MegaMenu dropdown must stay within the content container width — not overflow to full viewport.
24. Every design correction from owner MUST be recorded in owner-profile.jsonl AND critical-rules.md immediately.

## Component Reuse Map
- Search functionality → `DesktopSearchAutocomplete` (autocomplete, photo search, keyboard nav)
- Category menu/catalog → `MegaMenu` (hover dropdown, keyboard nav, subcategories)
- Price display → `PriceDisplay` or inline `formatPrice()`
- Section headers → `DesktopSectionHeader` (title, subtitle, tabs, view-all)
- Badges → `DesktopBadge` (count, dot, text variants)
