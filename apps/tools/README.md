# Tools Site (tools.ryancruz.com)

This is the tools suite for ryancruz.com, containing various developer utilities.

## Available Tools

- **Token Inspector**: Analyze JWT/OAuth tokens
- **Mermaid Diagram Viewer**: Create and preview Mermaid diagrams

## Development

```bash
# Run the development server
cd /Users/ryancruz/r-cz/r-cz-monorepo
bun run dev
```

## Mobile Responsiveness Guidelines

All tools must be designed to be usable on mobile devices. While the tools are primarily designed for desktop use, they should degrade gracefully on smaller screens.

### Key Mobile Responsiveness Principles

1. **Flexible Layouts**
   - Use `flex-col` for mobile and `sm:flex-row` for desktop when arranging elements horizontally
   - Use `grid-cols-1` with `sm:grid-cols-2` (or more) for grid layouts

2. **Responsive Button Styling**
   - Make buttons full-width on mobile: `w-full sm:w-auto`
   - For button groups, use `flex-col sm:flex-row` to stack on mobile

3. **Overflow Handling**
   - Add `overflow-auto` to containers that might have content exceeding viewport
   - Use `break-words` and `whitespace-pre-wrap` for text that might overflow
   - Use `truncate` with `title` attributes for long labels that need to be visible on hover

4. **Text Handling**
   - Use smaller font sizes on mobile: `text-sm md:text-base` or `text-2xl sm:text-3xl`
   - Add `break-all` for content like long IDs, hashes, or URLs

5. **Touch-Friendly Elements**
   - Ensure interactive elements are at least 44px in height on mobile
   - Add adequate spacing between touch targets: `gap-2` minimum

6. **Form Elements**
   - Stack form labels and inputs on mobile: `flex-col sm:flex-row`
   - Make inputs full-width on mobile

7. **Content Display**
   - Use vertical stacking on mobile before horizontal layouts
   - Break complex UI into logical sections that stack well

### Implementation Checklist

When creating a new tool, ensure:

- [ ] All layouts use responsive classes (sm, md, lg prefixes)
- [ ] No horizontal overflow on mobile screens (320px width minimum support)
- [ ] Text is readable without zooming
- [ ] Interactive elements are properly sized for touch
- [ ] All functionality is accessible on mobile
- [ ] Test on actual mobile devices or using browser dev tools

By following these guidelines, all tools will maintain a consistent mobile experience across the site.
