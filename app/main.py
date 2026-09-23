from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

ROOT = Path(__file__).resolve().parent.parent
STATIC = Path(__file__).resolve().parent / "static"
STATS_PATH = STATIC / "data" / "stats.json"
MODEL_PATH = ROOT / "diwali_spend_model.pkl"

AGE_GROUP_MID = {
    "0-17": 15,
    "18-25": 21,
    "26-35": 30,
    "36-45": 41,
    "46-50": 48,
    "51-55": 53,
    "55+": 74,
}

# Dataset zone modes (Andhra Pradesh uses U+00A0 in state name)
STATE_ZONE = {
    "Andhra Pradesh": "Southern",
    "Bihar": "Eastern",
    "Delhi": "Central",
    "Gujarat": "Western",
    "Haryana": "Northern",
    "Himachal Pradesh": "Northern",
    "Jharkhand": "Eastern",
    "Karnataka": "Southern",
    "Kerala": "Southern",
    "Madhya Pradesh": "Central",
    "Maharashtra": "Western",
    "Punjab": "Northern",
    "Rajasthan": "Northern",
    "Telangana": "Southern",
    "Uttar Pradesh": "Central",
    "Uttarakhand": "Central",
}

app = FastAPI(title="Diwali Sales Spend Prediction", version="1.0.0")
_model = joblib.load(MODEL_PATH)
_stats: dict[str, Any] = json.loads(STATS_PATH.read_text(encoding="utf-8"))


class PredictRequest(BaseModel):
    Gender: str = Field(..., examples=["F"])
    AgeGroup: str = Field(..., alias="Age Group", examples=["26-35"])
    State: str = Field(..., examples=["Uttar Pradesh"])
    Occupation: str = Field(..., examples=["IT Sector"])
    ProductCategory: str = Field(..., alias="Product_Category", examples=["Food"])
    MaritalStatus: int = Field(..., alias="Marital_Status", ge=0, le=1, examples=[1])
    Orders: int = Field(..., ge=1, le=4, examples=[2])
    Age: int | None = Field(None, ge=12, le=90)

    model_config = {"populate_by_name": True}


class PredictResponse(BaseModel):
    predicted_amount: float
    currency: str = "INR"
    peers: dict[str, float]
    inputs: dict[str, Any]


@app.get("/api/options")
def options() -> dict[str, Any]:
    return {
        "Gender": _stats["options"]["Gender"],
        "Age Group": _stats["options"]["Age Group"],
        "State": _stats["options"]["State"],
        "Occupation": _stats["options"]["Occupation"],
        "Product_Category": _stats["options"]["Product_Category"],
        "Orders": [1, 2, 3, 4],
        "Marital_Status": [0, 1],
    }


@app.get("/api/stats")
def stats() -> dict[str, Any]:
    return _stats


@app.post("/api/predict", response_model=PredictResponse)
def predict(body: PredictRequest) -> PredictResponse:
    age = body.Age if body.Age is not None else AGE_GROUP_MID.get(body.AgeGroup, 30)
    state = body.State.replace(" ", " ").strip()
    zone = STATE_ZONE.get(state)
    if zone is None:
        raise HTTPException(status_code=422, detail=f"Unknown state: {body.State}")
    # model was trained on dataset spellings (Andhra Pradesh carries U+00A0)
    model_state = "Andhra Pradesh" if state == "Andhra Pradesh" else state

    row = pd.DataFrame(
        [
            {
                "Gender": body.Gender,
                "Age Group": body.AgeGroup,
                "State": model_state,
                "Zone": zone,
                "Occupation": body.Occupation,
                "Product_Category": body.ProductCategory,
                "Age": age,
                "Marital_Status": body.MaritalStatus,
                "Orders": body.Orders,
            }
        ]
    )
    try:
        pred = float(_model.predict(row)[0])
    except Exception as exc:  # pragma: no cover - model input guard
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    s = _stats
    hm = s.get("heatmap_gender_age", {}).get(body.Gender, {})
    age_peer_amount = float(hm.get(body.AgeGroup) or s["mean"])

    peers = {
        "median": float(s["median"]),
        "mean": float(s["mean"]),
        "age_peer": round(age_peer_amount, 0),
        "max": float(s["max"]),
    }
    return PredictResponse(
        predicted_amount=round(pred, 0),
        peers=peers,
        inputs={
            "Gender": body.Gender,
            "Age Group": body.AgeGroup,
            "State": body.State,
            "Zone": zone,
            "Occupation": body.Occupation,
            "Product_Category": body.ProductCategory,
            "Marital_Status": body.MaritalStatus,
            "Orders": body.Orders,
            "Age": age,
        },
    )


@app.get("/")
def index() -> FileResponse:
    return FileResponse(STATIC / "index.html")


app.mount("/static", StaticFiles(directory=STATIC), name="static")
