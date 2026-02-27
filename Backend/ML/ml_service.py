from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import os

app = FastAPI()

# Load model safely
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")

model = None
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)

class PredictionInput(BaseModel):
    feature1: float
    feature2: float
    feature3: float

@app.get("/")
def home():
    return {"message": "ML Service Running"}

@app.post("/predict")
def predict(data: PredictionInput):
    if model is None:
        return {"error": "Model not loaded. Train model first."}

    input_df = pd.DataFrame([data.dict()])
    prediction = model.predict(input_df)

    return {
        "prediction": float(prediction[0])
    }