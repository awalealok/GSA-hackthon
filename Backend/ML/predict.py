import pandas as pd
import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "demand_forecast_model.pkl"


def predict_demand(item_mrp=120, item_visibility=0.2):
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Model not found at {MODEL_PATH}. Run `python Backend/ML/train.py` first."
        )

    model = joblib.load(MODEL_PATH)
    sample = pd.DataFrame([
        {
            "Item_MRP": item_mrp,
            "Item_Visibility": item_visibility,
        }
    ])

    prediction = model.predict(sample)
    return float(prediction[0])


if __name__ == "__main__":
    print("Predicted Demand:", predict_demand())

