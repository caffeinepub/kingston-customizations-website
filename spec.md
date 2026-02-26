# Specification

## Summary
**Goal:** Save the uploaded Kingston Customizations logo as a static asset and use it as the hero logo image so it appears instantly on page load with no flash.

**Planned changes:**
- Save IMG_2219.jpeg as a static asset at `frontend/public/assets/generated/logo.png`
- Update the Hero component to load the logo directly from the static path `/assets/generated/logo.png` instead of a backend-fetched source
- Update the Header component to also reference the same static asset path so it renders instantly without flash
- No other changes to Hero or Header content, layout, or styling

**User-visible outcome:** The Kingston Customizations logo (cream background with dark brown crown and script lettering) appears immediately in the Hero section on page load with no placeholder, blank flash, or other image showing first.
