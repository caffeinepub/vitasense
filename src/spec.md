# Specification

## Summary
**Goal:** Deliver an initial “VitaSense” wellness-themed app with a public landing page, Internet Identity authentication, a basic per-user profile, and a simple daily health log—plus a “Future AI Insights (Coming Soon)” section with clear non-medical disclaimers.

**Planned changes:**
- Create a branded public landing page for VitaSense with product description, non-medical disclaimer, and a clear sign-in call-to-action.
- Add Internet Identity sign-in/sign-out and display signed-in state (principal) in the UI.
- Implement a backend user profile model keyed by caller principal with get/upsert methods and created/updated timestamps.
- Build a signed-in dashboard to view/edit/save the user profile, surfacing backend errors in English.
- Add a per-user health log feature to create and list time-stamped entries (mood 1–5, sleep hours, notes), showing newest-first (up to the last 20).
- Add a static “Future AI Insights (Coming Soon)” page/section describing potential future AI features with an explicit non-medical disclaimer and no AI integrations.
- Establish and apply a consistent health/wellness visual theme across the app (not predominantly blue/purple).
- Add generated static brand assets (logo + hero illustration) under `frontend/public/assets/generated` and use them on the landing page and in the app header.

**User-visible outcome:** Visitors see a VitaSense landing page with branding, disclaimer, and a sign-in entry point. Users can sign in with Internet Identity, view their principal, edit/save a personal profile, add and review recent daily health log entries, and read a clearly labeled “Future AI Insights (Coming Soon)” section.
