---
name: Diwali Sales — One Sheet
description: Vermilion orizuru — one washi sheet folded into a standing spend prediction.
colors:
  vermilion: "#d4351c"
  vermilion-text: "#b82d18"
  vermilion-deep: "#a82814"
  washi: "#f7f0e8"
  crease: "#e8d9c8"
  sumi: "#1a1614"
  gold: "#c9a227"
  fold-white: "#fff8f0"
  sumi-soft: "#5a5048"
  sumi-mute: "#6b6058"
typography:
  display:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 4.2vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.15
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.05rem"
    lineHeight: 1.55
  label:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "0.72rem"
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.fold-white}"
    rounded: "{rounded.none}"
    padding: "0.65rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.vermilion-deep}"
---

# Design System: Diwali Sales — One Sheet

## Overview

**Creative North Star: "Vermilion Orizuru"**

One uncut vermilion washi sheet, creased thirty-two times until the crane stands. The system refuses the card-grid dashboard — instead a continuous crease pattern where every section is a fold and prediction is the final fold that slams the ₹ figure upright. Kozo fiber grain, sumi ink, gold active marks, and 1px hard borders carry the world.

**Key Characteristics:**
- Washi ground with subtle grid grain, never flat white
- Hard sumi borders and dashed crease dividers, no rounded cards
- Gold marks active state; vermilion marks magnitude
- Left vermilion rail with numbered steps anchors the sheet

## Colors

Washi warm ground with sumi ink and vermilion magnitude, gold for the active fold.

### Primary
- **Vermilion** (#d4351c): magnitude fills, primary button, rail; the leading fold in every chart.
- **Vermilion Deep** (#a82814): hover/active pressure on vermilion.

### Secondary
- **Gold** (#c9a227): active step, booth corner dot, gold fills for top occupation; never as body text on washi.

### Neutral
- **Washi** (#f7f0e8): page ground with fiber grid.
- **Fold White** (#fff8f0): panel/booth/metric fill.
- **Crease** (#e8d9c8): tracks, dividers, muted bar fills, booth shadow.
- **Sumi** (#1a1614): ink text, borders, muted fills (55% opacity).
- **Sumi Soft** (#5a5048): subcopy and insights.
- **Sumi Mute** (#6b6058): labels, hints, axis text.

### Named Rules
**The Vermilion Is Magnitude Rule.** Vermilion fill = the largest bar or the prediction; muted sumi = remainder; gold = top occupation only.

## Typography

**Display Font:** Source Sans 3 (system-ui fallback) — all headings and UI.
**Accent Font:** Noto Serif JP — left rail kanji only.
**Character:** Clean, slightly condensed sans with tabular numerals for metrics; kanji rail adds craft specificity without ornamenting body copy.

### Hierarchy
- **Display** (600, clamp 1.8rem–2.75rem, 1.15): H1 hero, 22ch measure, vermilion accent span.
- **Headline** (600, 1.35rem, 1.25): panel H2s.
- **Title** (600, 1.05rem): chart block H3s.
- **Body** (400, 1.05rem/1.55): subcopy (54ch), hints (60ch), max 72ch measure.
- **Label** (400, 0.72rem, 0.1em, uppercase): metric labels, form labels, heatmap headers.

## Layout

Sheet grid: 72px vermilion rail + 1fr main, max 1100px centered. Main padding 2rem 2.25rem. Panels have 1.5rem internal padding and 2rem bottom stack. Metrics strip is 4-cell bordered grid (2×2 on mobile). Charts in 2-col grid, form in 3-col grid. Breakpoints 820px (grids collapse) and 720px (rail 48px, metrics 2×2, form single column). Sticky rail at 100vh.

## Elevation & Depth

Flat washi with tonal layering; one structural shadow only. No ambient card shadows.

### Shadow Vocabulary
- **Booth Lift** (`6px 6px 0 #e8d9c8`): booth panel offset block, crease-colored.
- **Button Press** (`3px 3px 0 #1a1614`): primary button, translates on active to 1px.

### Named Rules
**The One Shadow Rule.** Only the booth and the primary button cast shadows; all other panels are flat with 1px sumi borders.

## Shapes

Hard-edged, no radius except circular step indicators. All panels, metrics, selects, and buttons are 0 radius. Step dots are perfect circles (50%). Borders are 1px solid sumi; booth adds 3px vermilion-deep double rail accent. Selects use custom vermilion chevron, not native arrow.

## Components

### Buttons
- **Shape:** sharp 0 radius, offset sumi shadow.
- **Primary:** vermilion (#d4351c) on fold-white text, 0.65rem 1.5rem, 600 weight.
- **Hover / Focus:** vermilion-deep; focus-visible is 2px sumi outline + 2px gold for selects.
- **Active:** translate 2px 2px, shadow shrinks to 1px.

### Cards / Containers
- **Panel:** fold-white on washi, 1px sumi border, 1.5rem padding.
- **Booth:** same plus 6px crease shadow, gold dot pseudo-element at top.
- **Verdict:** 1px sumi border with 3px vermilion top accent.

### Inputs / Fields
- **Style:** washi fill, 1px #c4b5a5 border, 0 radius, custom vermilion chevron.
- **Focus:** 2px gold outline, border shifts to sumi.
- **Label:** 0.72rem uppercase mute above each field.

### Navigation
- Rail steps: 28px circles, fold-white 1px border at 45% opacity; active is gold fill with sumi text. Top nav: 0.88rem sumi links, active/hover is vermilion-text with 2px vermilion underline.

### Charts
- Bar track 14px crease, fill vermilion scaled via --w; muted sumi 55% and gold variants. Heatmap cells 1.4 aspect, crease border, vermilion intensity scale. Peer bars 72px tall with sumi top border, hi variant vermilion.

## Do's and Don'ts

### Do:
- **Do** keep the left vermilion rail on every viewport (48px on mobile).
- **Do** use tabular numerals for all amounts and metrics.
- **Do** animate folds with snap cubic-bezier (.2,.8,.2,1), not free glide.
- **Do** ring the prediction amount with vermilion and stand animation on result.

### Don't:
- **Don't** introduce rounded cards or blue focus glows — gold/sumi only.
- **Don't** add shadows beyond booth and button.
- **Don't** use vermilion for body text — reserved for magnitude and accent span.
- **Don't** fabricate testimonials, benchmarks, or press — dataset and model only.
