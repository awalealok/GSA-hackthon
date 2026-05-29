from pathlib import Path

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

import pandas as pd
import joblib

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parents[1]
MODEL_PATH = BASE_DIR / "models" / "demand_forecast_model.pkl"
model = None


def get_model():
    global model

    if model is None:
        if not MODEL_PATH.exists():
            raise HTTPException(
                status_code=503,
                detail=f"Model not found. Run `python {BASE_DIR / 'train.py'}` first.",
            )
        model = joblib.load(MODEL_PATH)

    return model

# Request Schema
class PredictionInput(BaseModel):
    Item_MRP: float
    Item_Visibility: float

# Home Route
@app.get("/")
def home():
    return {
        "message": "APIOS ML Service Running",
        "model_loaded": MODEL_PATH.exists(),
    }

# Prediction Route
@app.post("/predict")
def predict(data: PredictionInput):

    sample = pd.DataFrame([
        {
            "Item_MRP": data.Item_MRP,
            "Item_Visibility": data.Item_Visibility
        }
    ])

    prediction = get_model().predict(sample)

    return {
        "predicted_demand": float(prediction[0])
    }
