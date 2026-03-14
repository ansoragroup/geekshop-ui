Add responsive container queries to a GeekShop UI component.

Arguments: $ARGUMENTS (component name)

Instructions:
1. Read CLAUDE.md for the container query responsive pattern
2. Read the target component's .tsx and .module.scss files
3. Read src/theme/tokens.scss for breakpoint and spacing tokens

4. Add container query support:
   a. Add `container-type: inline-size` to the component's root element in SCSS
   b. Define 3 responsive tiers:
      - Compact (< 200px): minimal info, hide secondary content
      - Standard (200-320px): default mobile layout
      - Expanded (> 320px): horizontal/desktop layout with more detail

5. E-commerce UX rules for responsive components:
   - Price is ALWAYS visible, never hidden
   - Product title can be truncated (line-clamp) but never hidden
   - Images maintain aspect ratio, can change size
   - Action buttons (Add to Cart) can be hidden in compact, shown in expanded
   - Ratings can be simplified (number only in compact, stars in standard+)
   - Badges reduce size in compact

6. Update the component's stories to demonstrate responsive behavior:
   - Add a "Responsive" story showing the component at different container widths
   - Use decorator with fixed-width wrapper divs

7. Verify: npm run lint && npm run build:lib
