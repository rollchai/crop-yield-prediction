import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function YieldForm() {
  const [formData, setFormData] = useState({
    Field_ID: 102,
    Year: 2024,
    Crop: "Maize",
    Previous_Crop: "Wheat",
    Soil_pH: 6.5,
    Soil_Nitrogen: 50,
    Soil_Phosphorus: 20,
    Soil_Potassium: 140,
    Organic_Matter: 3.5,
    Rainfall: 600,
    Avg_Temperature: 25,
    NDVI: 0.65,
    Irrigation: "Drip",
    Fertilizer_Type: "Chemical",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const cropOptions = ["Wheat", "Maize", "Soybean", "Rice", "Barley", "Legume"];
  const irrigationOptions = ["None", "Drip", "Sprinkler"];
  const fertilizerOptions = ["None", "Chemical", "Organic"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        ["Field_ID", "Year", "Soil_Nitrogen", "Soil_Phosphorus", "Soil_Potassium", "Rainfall"].includes(name)
          ? parseInt(value)
          : ["Soil_pH", "Avg_Temperature", "Organic_Matter", "NDVI"].includes(name)
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData);
      const predicted_yield = response.data.predicted_yield;
      navigate("/result", { state: { result: { ...formData, predicted_yield } } });
    } catch (err) {
      console.error("Error:", err);
      setError("⚠️ Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>🌾 AI Crop Yield Predictor</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            "Field_ID",
            "Year",
            "Soil_pH",
            "Soil_Nitrogen",
            "Soil_Phosphorus",
            "Soil_Potassium",
            "Organic_Matter",
            "Rainfall",
            "Avg_Temperature",
            "NDVI",
          ].map((field) => (
            <div key={field} style={styles.inputGroup}>
              <label style={styles.label}>{field.replace("_", " ")}:</label>
              <input
                type="number"
                step={["Soil_pH", "Organic_Matter", "Avg_Temperature", "NDVI"].includes(field) ? "0.01" : "1"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          ))}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Crop:</label>
            <select name="Crop" value={formData.Crop} onChange={handleChange} style={styles.select}>
              {cropOptions.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Previous Crop:</label>
            <select
              name="Previous_Crop"
              value={formData.Previous_Crop}
              onChange={handleChange}
              style={styles.select}
            >
              {cropOptions.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Irrigation:</label>
            <select name="Irrigation" value={formData.Irrigation} onChange={handleChange} style={styles.select}>
              {irrigationOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Fertilizer Type:</label>
            <select
              name="Fertilizer_Type"
              value={formData.Fertilizer_Type}
              onChange={handleChange}
              style={styles.select}
            >
              {fertilizerOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "🌾 Predicting..." : "🚜 Predict Yield"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  page: {
    minHeight: "50vh",
    background: `linear-gradient(120deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80') center/cover`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    marginTop:"20px",
    padding: "20px",
  },
glassCard: {
  background: "rgba(255, 255, 255, 0)", // fully transparent
  borderRadius: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)", // softer shadow
  padding: "40px",
  width: "100%",
  maxWidth: "700px",
  backdropFilter: "blur(15px)", // stronger blur for glass effect
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  animation: "fadeIn 1s ease",
}
,


  title: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: "25px",
    textShadow: "0 2px 3px rgba(0,0,0,0.1)",
  },

  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontWeight: "600",
    color: "#1B5E20",
    marginBottom: "6px",
  },

  input: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
    transition: "all 0.3s ease",
    outline: "none",
  },

  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
    background: "white",
    transition: "all 0.3s ease",
    outline: "none",
  },

  button: {
    gridColumn: "1 / -1",
    marginTop: "20px",
    padding: "14px 0",
    background: "linear-gradient(135deg, #43A047, #1B5E20)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginTop: "15px",
  },
};

// 🎞 Add animation and hover glow via CSS
const css = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}

input:focus, select:focus {
  border-color: #43A047;
  box-shadow: 0 0 8px rgba(67, 160, 71, 0.4);
}

button:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 6px 15px rgba(67, 160, 71, 0.4);
}
`;
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);
}

export default YieldForm;
