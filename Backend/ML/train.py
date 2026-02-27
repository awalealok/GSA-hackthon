import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# -----------------------------
# 1. Load Dataset
# -----------------------------
# Make sure dataset.csv is inside backend/ml/
data = pd.read_csv("ML-Dataset.csv")

# -----------------------------
# 2. Basic Cleaning
# -----------------------------
data = data.dropna()

# Rename columns if needed (adjust only if your dataset differs)
# Expected logical meaning:
# date -> date
# sales -> quantity sold
column_mapping = {
    "Date": "date",
    "Sales": "sales",
    "Quantity": "sales"
}

data.rename(columns=column_mapping, inplace=True)

# -----------------------------
# 3. Convert Date to Numeric
# -----------------------------
data["date"] = pd.to_datetime(data["date"])
data["date_num"] = data["date"].map(pd.Timestamp.toordinal)

# -----------------------------
# 4. Features & Target
# -----------------------------
X = data[["date_num"]]   # feature
y = data["sales"]        # target

# -----------------------------
# 5. Train Model
# -----------------------------
model = LinearRegression()
model.fit(X, y)

# -----------------------------
# 6. Save Model
# -----------------------------
joblib.dump(model, "demand_forecast_model.pkl")

print("Model trained successfully and saved as demand_forecast_model.pkl")
import joblib
joblib.dump(model, "model.pkl")
print("Model saved as model.pkl")