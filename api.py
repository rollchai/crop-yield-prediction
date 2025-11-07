# api.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

# -------------------------------
# Load the trained model
# -------------------------------
# Make sure 'crop_model.pkl' exists in the same folder as this file
model = joblib.load('crop_model.pkl')

# -------------------------------
# Create FastAPI app
# -------------------------------
app = FastAPI(title="Crop Yield Prediction API")

# -------------------------------
# CORS settings
# -------------------------------
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Use ["*"] to allow all origins (dev only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Define input data schema
# -------------------------------
class FieldData(BaseModel):
    Field_ID: int
    Year: int
    Crop: str
    Previous_Crop: str
    Soil_pH: float
    Soil_Nitrogen: int
    Soil_Phosphorus: int
    Soil_Potassium: int
    Organic_Matter: float
    Rainfall: int
    Avg_Temperature: float
    NDVI: float
    Irrigation: str
    Fertilizer_Type: str

# -------------------------------
# Test endpoint
# -------------------------------
@app.get("/")
def root():
    return {"message": "Crop Yield Prediction API is running!"}

# -------------------------------
# Prediction endpoint
# -------------------------------
@app.post("/predict")
def predict_yield(data: FieldData):
    # Convert incoming data to DataFrame
    input_df = pd.DataFrame([data.dict()])
    
    # Predict yield using the trained model pipeline
    prediction = model.predict(input_df)
    
    # Return result
    return {"predicted_yield": round(float(prediction[0]), 2)}
