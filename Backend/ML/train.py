import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "datasets" / "big_mart_sales.csv"
MODEL_PATH = BASE_DIR / "models" / "demand_forecast_model.pkl"

FEATURE_COLUMNS = [
    "Item_MRP",
    "Item_Visibility",
]
TARGET_COLUMN = "Item_Outlet_Sales"


def train_model():
    df = pd.read_csv(DATASET_PATH)
    df.fillna(0, inplace=True)

    missing_columns = [
        column
        for column in [*FEATURE_COLUMNS, TARGET_COLUMN]
        if column not in df.columns
    ]
    if missing_columns:
        raise ValueError(f"Dataset is missing columns: {', '.join(missing_columns)}")

    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
    )

    model = RandomForestRegressor(
        n_estimators=100,
        random_state=42,
    )
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)

    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, MODEL_PATH)

    return mae


if __name__ == "__main__":
    mae = train_model()
    print("Mean Absolute Error:", mae)
    print(f"Model Trained Successfully: {MODEL_PATH}")

