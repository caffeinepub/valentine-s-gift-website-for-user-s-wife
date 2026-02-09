# Specification

## Summary
**Goal:** Fix the Valentine page gallery so uploaded photos display immediately, persist across refreshes, and reliably sync with the Personalize dialog state.

**Planned changes:**
- Correct gallery rendering and persistence so each of the 6 slots shows the newly uploaded image immediately and restores it after refresh; removals revert to placeholders after save/refresh.
- Fix Personalize dialog state initialization and synchronization so opening the dialog reflects the latest saved personalization (including gallery photos), saving updates the page immediately, and “Reset to Default” clears uploaded photos and resets content.
- Add user-facing error handling for localStorage persistence failures (e.g., quota exceeded) and ensure success messages are not shown when persistence fails.
- Implement client-side image resizing/compression for uploaded gallery photos before storing them in browser-local personalization data to reduce localStorage failures.

**User-visible outcome:** Users can upload and remove up to 6 gallery photos and see changes instantly; photos remain visible after refreshing, the Personalize dialog always matches saved content, and clear error messages appear if saving fails.
