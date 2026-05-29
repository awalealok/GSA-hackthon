# APIOS ML Module

This module handles:

- Demand Forecasting
- Inventory Optimization
- AI Predictions
- Multi-Agent AI Logic

## Features

- Random Forest Regression
- FastAPI Prediction Service
- CSV Dataset Training
- Inventory Forecasting

## Run Training

```bash
python Backend/ML/train.py
```

## Run Prediction Test

```bash
python Backend/ML/predict.py
```

## Run ML API

```bash
cd Backend/ML
uvicorn services.ml_service:app --reload --port 8001
```

## API Endpoint

POST:

/predict

Example JSON:

```json
{
  "Item_MRP": 120,
  "Item_Visibility": 0.2
}
```
