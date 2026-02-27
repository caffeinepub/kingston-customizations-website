# Specification

## Summary
**Goal:** Replace all existing photos in the "Our Work" gallery section with 14 newly uploaded real project photos.

**Planned changes:**
- Save all 14 uploaded project photos as static assets in `frontend/public/assets/generated/` with filenames `work-01.jpg` through `work-14.jpg`
- Update the Gallery (Our Work) component to remove all previously used photos and replace them with the 14 new images loaded from `/assets/generated/work-01.jpg` through `work-14.jpg`
- Keep all existing gallery UI elements unchanged (responsive grid layout, lightbox modal, previous/next navigation, category badges)

**User-visible outcome:** The "Our Work" section displays exactly the 14 new real project photos and no previously existing placeholder or generated images.
