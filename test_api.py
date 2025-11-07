import requests

url = "http://127.0.0.1:8000/predict"
data = {
    "Field_ID": 102,
    "Year": 2024,
    "Crop": "Maize",
    "Previous_Crop": "Wheat",
    "Soil_pH": 6.5,
    "Soil_Nitrogen": 50,
    "Soil_Phosphorus": 20,
    "Soil_Potassium": 140,
    "Organic_Matter": 3.5,
    "Rainfall": 600,
    "Avg_Temperature": 25,
    "NDVI": 0.65,
    "Irrigation": "Drip",
    "Fertilizer_Type": "Chemical"
}

response = requests.post(url, json=data)
print(response.json())
