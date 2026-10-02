# Phase 2 validation

## Passed

- Golden parity: all 11 non-Feedback sections preserve normalized exact text and original order. Hero, vocabulary, sentence examples, grammar examples, interpretation, October plan, class counts, Archive URL and footer are preserved.
- Structure: 12 golden-sample regions; no generated missing modules; composition reorder, omission and repetition tests.
- Variable content: different paragraph, vocabulary, pattern/example and continuum-step counts render without fixed student content cardinalities.
- Data contract: required identity/version checks, invalid month, duplicate module IDs, unknown types, absent values and invalid evidence rejection.
- Archive: report override, student fallback, missing-link state and unsafe URL rejection. Original URL unchanged. Real Drive access permissions were not checked.
- Feedback: three shared five-point questions, exact payload keys, numeric range checks, empty-answer rejection and unavailable adapter. No successful-save claim or persistence.
- Security/structure: escaped injected text, unique DOM IDs, resolved aria-controls/aria-labelledby/label-for references, no inline event-handler attributes.
- HTML: lxml parsing reported no diagnostics. This is a parser/structure check, not a full standards conformance certificate.
- JavaScript: Node syntax checks and renderer/contract tests passed. Generated output matches source regeneration.
- Progressive enhancement: report text is statically present; reveal CSS starts visible. Submit is disabled until enhancement binds, preventing an unintended default form submission when JavaScript is unavailable.

## Intentional differences from main

Report-quality Feedback replaces the old student-evaluation questions. Grammar example switching uses native buttons with aria-pressed/aria-controls and polite result updates. Minimum text/touch sizes, visible focus, wrap-safe rows and reduced-motion handling are added. Fade-up and count-up are omitted in v1: all numeric evidence remains visible and final. Palette, 640px column, original cards and overall spacing are retained.

## Not executed / not claimed as passed

Actual 360 / 390 / 412px rendering, screenshot/visual parity, 200% text enlargement, keyboard and screen-reader operation, no-JS visual behavior, computed touch sizes, browser runtime and contrast measurement are pending. The Playwright package is present, but Chromium is absent; attempted Headless Shell downloads returned corrupt/empty ZIP archives and installation failed. tests/browser.cjs was attempted and failed before browser launch. No viewport result was obtained.

CSS specifies Feedback 48px targets and grammar buttons 44px targets, but computed geometry is unverified. Keyboard semantics are implemented, not browser-tested. Full HTML conformance and actual font rendering are also unverified.

No production deploy or merge. Before a later release, run browser QA, inspect actual typography and compare golden screenshots, then verify Drive access for the intended parent.
