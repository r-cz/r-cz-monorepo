# Automated Testing for ryancruz.com

This directory contains automated tests for both ryancruz.com and tools.ryancruz.com using Playwright.

## Test Structure

- `main/` - Tests for the main site (ryancruz.com)
  - `main-site.spec.ts` - Consolidated main site tests (page loading, navigation, theme switching)
- `tools/` - Tests for the tools site (tools.ryancruz.com)
- `utils/` - Shared test utilities and helpers

## Running Tests

```bash
# Run all tests
bun run test

# Run tests for specific site
bun run test:main
bun run test:tools

# Run tests with UI mode for debugging
bun run test:ui

# View test reports
bun run test:generate-report
```

## Test Strategy

The tests follow these principles:

1. **Basic Functionality Tests**:
   - Page loading tests (ensure pages load without errors)
   - Theme toggle tests (verify theme toggle button exists and can be clicked)
   - Navigation tests (verify navigation between pages works)

2. **Tool-Specific Tests**:
   - JWT Token Inspector tests
   - Mermaid Diagram Generator tests

## Troubleshooting Tests

### Common Issues

- **Selector Mismatches**: If tests fail due to selector issues, use the inspector tool.
- **Static Site Issues**: The site is built as a static export, which requires using `serve` instead of `next start`.
- **Path Changes**: If URL paths change, tests need to be updated accordingly.

### Inspecting Sites for Better Selectors

Use the inspector tool to examine DOM structure:

```bash
# Inspect main site DOM
bun playwright test tests/utils/inspector.spec.ts:5 --headed --debug

# Inspect tools site DOM
bun playwright test tests/utils/inspector.spec.ts:29 --headed --debug
```

## CI/CD Integration

Tests automatically run on GitHub Actions:
- On push to `main` branch
- On pull requests targeting `main` branch

Test reports are uploaded as artifacts and can be viewed in the GitHub Actions workflow run.

## Further Improvements

Future enhancements to consider:

1. **Visual Regression Testing**: Add tests that compare screenshots of pages to detect visual changes.

2. **API Tests**: If you add backend functionality, consider adding API tests.

3. **Accessibility Tests**: Add tests that check for accessibility issues.

4. **Performance Tests**: Add tests that measure page load times and performance metrics.

5. **Consolidate Tools Tests**: Consider consolidating the tools site tests like we did for the main site tests, to reduce duplication and improve maintainability.