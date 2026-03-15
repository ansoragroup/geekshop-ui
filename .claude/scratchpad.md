# Session Context — GeekShop UI

## Current State
- Phases 1-4 complete, Phase 5 (ecosystem) future work
- 54+ components, 4 hooks, 101 tests, all passing
- npm package: @geekshop/ui (not yet published to registry)
- Storybook runs on localhost:6006

## Critical Rules (survive compaction)
1. container-type: inline-size MUST have width: 100%
2. Story decorators use `width: 390`, NEVER just `maxWidth`
3. @container queries cannot style the container element itself
4. Every component change needs Playwright MCP visual verification
5. forwardRef + ...rest props on all interactive components
6. Never use deprecated Sass (darken/lighten)

## Recent Work
- Visual audit found 4 broken components (OrderCard, ReviewCard, Skeleton, Popup) — all fixed
- AddressCard completely rewritten for proper layout
- 5 new page compositions added (OrderDetail, Checkout, Wishlist, Reviews, Notifications)
- CLAUDE.md updated with rules 13-14 (width vs maxWidth, container self-styling)

## In Progress
- AppBar component (Taobao-style top bar with location/search/scan)
- Masonry/waterfall ProductGrid layout variant
- DO NOT COMMIT — changes left for user review
