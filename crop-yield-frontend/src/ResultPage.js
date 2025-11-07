import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <div style={container}>
        <h2>No result found 😕</h2>
        <button onClick={() => navigate("/")} style={btnStyle}>Go Back</button>
      </div>
    );
  }

  const handleSave = () => {
    const history = JSON.parse(localStorage.getItem("predictionHistory")) || [];
    history.push(result);
    localStorage.setItem("predictionHistory", JSON.stringify(history));
    alert("✅ Prediction saved to history!");
  };

  return (
    <div style={container}>
      <h2 style={{ color: "#2E7D32" }}>🌾 Crop Yield Prediction Result</h2>

      <div style={card}>
        <p><strong>Predicted Yield:</strong> {result.predicted_yield.toFixed(2)} tons/hectare</p>
        <p><strong>Crop:</strong> {result.Crop}</p>
        <p><strong>Previous Crop:</strong> {result.Previous_Crop}</p>
        <p><strong>Rainfall:</strong> {result.Rainfall} mm</p>
        <p><strong>Temperature:</strong> {result.Avg_Temperature}°C</p>
        <p><strong>Soil pH:</strong> {result.Soil_pH}</p>
        <p><strong>Irrigation:</strong> {result.Irrigation}</p>
        <p><strong>Fertilizer:</strong> {result.Fertilizer_Type}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSave} style={btnStyle}>💾 Save to History</button>
        <button onClick={() => navigate("/history")} style={btnStyle}>📜 View History</button>
        <button onClick={() => navigate("/")} style={btnStyle}>🔄 New Prediction</button>
      </div>
    </div>
  );
}

const container = {
  maxWidth: "600px",
  margin: "50px auto",
  textAlign: "center",
  padding: "20px",
  borderRadius: "12px",
  background: "#f4f6f8",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
  marginTop: "20px",
  lineHeight: "1.6"
};

const btnStyle = {
  background: "#2E7D32",
  color: "white",
  border: "none",
  padding: "10px 16px",
  margin: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px"
};

export default ResultPage;
