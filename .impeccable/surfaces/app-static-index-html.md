---
version: 1
slug: "app-static-index-html"
primary_target: "app/static/index.html"
related_targets: []
---

# Surface brief — main long page

## Scope and visitor mode

Primary target: `app/static/index.html` (served by FastAPI at `/`). Mode: Operate — recruiter/visitor scans findings, then completes the prediction form. One long page: Finding → analysis reels → model billing → prediction booth → result.

## Audience, job, action, proof, constraints

- Audience: recruiters (primary), curious visitors (secondary).
- Job: judge end-to-end data→ML→product craft in seconds; optionally test the model.
- Action: submit dropdown profile → get predicted ₹ spend with peer comparison graph.
- Proof: README segment finding, real dataset stats (11,239 orders, mean ₹9,454), working RandomForest pipeline (`diwali_spend_model.pkl`).
- Constraints: FastAPI; no fabricated metrics/testimonials; ₹ currency; not a generic ML demo; model retraining out of scope.

## Direction and memorable moment

**Chosen direction (bolder re-roll, challenger): Vermilion orizuru** — seed key `56382a33`, source `paper-folds-pleats-deployable-orizuru-crane-sequence`, kind `challenger`.

- World: one vermilion washi sheet with visible kozo fiber; crease lines in faded fold-white; gold dot marks the active step; sumi black notes; numbered fold margin (steps 1–5) on the left rail.
- Raises carried in: snap stepwise transitions (not free glide); selected fields get a hand-mark not a blue glow; data marks use magnitude-as-size, prediction point ringed/highlighted.

**Memorable moment:** Final fold — submit slams the predicted ₹ figure onto the booth panel as the crane “stands,” with bar comparison vs median/mean/age peers.

## Direction contract

THESIS: The analysis is one uncut sheet folded thirty-two times into a standing crane — refuse the card-grid dashboard and the hero-metric template; the long page is a continuous crease pattern, prediction is the final fold.

OWN-WORLD: Vermilion washi ground `#f7f0e8` with fiber grain; ink `#1a1614`; crease `#e8d9c8`; active gold `#c9a227`; fold-white panels `#fff8f0`; Source Sans 3 body + Noto Serif JP margin labels; hard 1px sumi borders, offset block shadow only on the booth; left vermilion margin rail with numbered steps; no rounded cards, no blue focus glow (gold/sumi marks).

STORY: Visitor reads the top-spender finding as the sheet’s opening crease, scans metric folds and analysis charts as intermediate folds, reaches the booth, sets six inputs, hits Final fold, sees ₹ predicted vs dataset peers.

FIRST VIEWPORT: Full-width washi with left vermilion step rail (kanji 支出予測 + steps 1–5, step 2 gold-active); header brand + Finding/Predict/Proof nav; H1 “Thirty-two folds from raw orders to one predicted spend” with vermilion accent on “one predicted spend”; subcopy naming the segment and model; dashed crease-row divider; four-cell metrics strip (11,239 / ₹9,454 / ₹8,109 / 9 features) in sumi-bordered fold-white; top of booth visible below fold with gold corner dot.

FORM: Ranked list position 1 of the bolder hand’s grounded alternatives for this product (demo `02-origami.html` locked); seed key `56382a33`.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved decisions

- Deployment target still open (local uv run only for now).
- Chart library: lightweight inline SVG/CSS bars in demo style vs a chart lib — prefer authored SVG in world grammar unless build needs more.
