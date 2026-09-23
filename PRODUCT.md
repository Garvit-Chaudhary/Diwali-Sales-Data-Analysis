# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing analysis stack: Python ≥3.14, pandas, numpy, matplotlib, seaborn, scikit-learn, XGBoost, LightGBM (uv-managed, Jupyter notebooks), with a pre-trained spend model at `diwali_spend_model.pkl`. Web framework: FastAPI (confirmed) serving a single long-page UI plus JSON prediction endpoint. Deployment target undecided (local uv development for now).

## Users

Primary: recruiters and hiring managers evaluating the author's portfolio. They encounter the product as proof of end-to-end data analysis, machine learning, and Python backend skill. Secondary: any visitor exploring Diwali sales customer behavior through the interface.

## Product Purpose

Turn the completed Diwali sales analysis and spend-prediction model into a polished web product: a dashboard presenting the analysis beautifully, plus an interactive UI where a visitor selects inputs via dropdowns and receives a predicted average spend in ₹, visualized with graphs. Success means the portfolio piece convincingly showcases data analysis, ML, and backend engineering, and helps the author get a job.

## Positioning

A portfolio product that pairs a real regression-based spend-prediction pipeline (trained on Diwali sales demographics, occupation, location, orders, and product category) with a curated analytical narrative and an interactive, graph-backed prediction interface — demonstrating full-stack data-to-product work, not just charts.

## Operating Context

- Analysis phase is complete: `Diwali_Sales_Analysis.ipynb` and `Diwali_Sales_ML.ipynb` hold the exploration and model training; `diwali_spend_model.pkl` is the pickled prediction pipeline.
- Data source is `Diwali Sales Data.csv` in the repo root.
- The interface layer (FastAPI or Flask) is to be built on top of the existing notebooks/model.
- Development runs locally (Windows, uv virtualenv).

## Capabilities and Constraints

- Present the completed Diwali sales analysis as a beautiful dashboard with graphs (single long page: findings first, prediction as interactive climax).
- Interactive prediction: user picks inputs through dropdown menus; backend returns predicted average spend in ₹; result rendered with a graph.
- Predictions use the existing regression pipeline on demographics, occupation, location, number of orders, and product category.
- Spend is denominated in ₹.
- Web framework is FastAPI (confirmed); deployment target is undecided.
- Model retraining/pipeline changes are out of scope unless later requested.

## Brand Commitments

Project name: Diwali-Sales-Data-Analysis. Currency is ₹ (INR). Diwali sales context and the README's analytical narrative are part of the product identity.

## Evidence on Hand

- `Diwali Sales Data.csv` — full source dataset.
- `Diwali_Sales_Analysis.ipynb` — completed analysis and visualizations.
- `Diwali_Sales_ML.ipynb` — model training notebook.
- `diwali_spend_model.pkl` — trained spend-prediction pipeline.
- `README.md` — confirmed finding to preserve: married women aged 26–35 from Uttar Pradesh, Maharashtra, and Karnataka, working in IT, Healthcare, and Aviation, are the highest-spending segment; predicts customer spend (₹) via regression.
- No deployed site, testimonials, customers, benchmarks, or press exist; future work must not fabricate any.

## Product Principles

1. The product is portfolio proof: every screen must demonstrate craft alongside analytical rigor.
2. Product truth comes from the notebooks and dataset — the interface presents, never invents, findings or numbers.
3. The confirmed README segment finding and ₹ regression framing are binding across all surfaces.
4. The analysis narrative and the interactive prediction are one experience: explanation and action reinforce each other.
5. The existing completed pipeline is the engine; interface work builds on it rather than rewriting it.

## Accessibility & Inclusion

No product-specific requirement was established yet; dropdowns, forms, charts, and results should follow general web accessibility defaults until confirmed otherwise.
