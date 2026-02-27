import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# 1. Load dataset
# Make sure dataset.csv is inside backend/ml/
data = pd.read_csv("ML-Dataset.csv")

# 2. Basic preprocessing
# Ensure column names match your dataset
# Example expected columns:
# date, sales, stock

data = data.dropna()

# Convert date to numerical value (simple approach)
data["date"] = pd.to_datetime(data["date"])
data["date_ordinal"] = data["date"].map(pd.Timestamp.toordinal)

# 3. Define features (X) and target (y)
X = data[["date_ordinal"]]
y = data["sales"]

# 4. Train model
model = LinearRegression()
model.fit(X, y)

# 5. Save trained model
joblib.dump(model, "demand_forecast_model.pkl")

print("Model trained and saved successfully")
