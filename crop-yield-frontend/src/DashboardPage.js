// src/DashboardPage.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Header"; // import your sidebar
import Topbar from "./components/Topbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DashboardPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("predictionHistory")) || [];
    setHistory(saved);
  }, []);

  if (history.length === 0) {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "220px", padding: "50px" }}>
          <h2>No data yet 📉</h2>
          <p>Go to the prediction form and generate some results first!</p>
        </div>
      </div>
    );
  }

  // Summary stats
  const avgRainfall =
    history.reduce((sum, item) => sum + item.Rainfall, 0) / history.length;
  const avgTemp =
    history.reduce((sum, item) => sum + item.Avg_Temperature, 0) / history.length;
  const mostCommonCrop = Object.entries(
    history.reduce((acc, item) => {
      acc[item.Crop] = (acc[item.Crop] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0][0];

  // Chart data
  const labels = history.map((item) => `${item.Crop} (${item.Year})`);
  const yields = history.map((item) => item.predicted_yield);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Predicted Yield (tons/ha)",
        data: yields,
        backgroundColor: "rgba(102, 187, 106, 0.8)", // green shade
        borderColor: "#2E7D32",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  return (
   <>
   <Topbar/>
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div style={{ marginLeft: "220px", padding: "40px", width: "100%" }}>
        <div style={styles.container}>
          <h2 style={styles.heading}>📊 Yield Dashboard</h2>

          {/* Summary cards */}
          <div style={styles.summaryContainer}>
            <div style={styles.card}>
              <h3>🌾 Common Crop</h3>
              <p>{mostCommonCrop}</p>
            </div>
            <div style={styles.card}>
              <h3>🌧️ Avg Rainfall</h3>
              <p>{avgRainfall.toFixed(1)} mm</p>
            </div>
            <div style={styles.card}>
              <h3>🌡️ Avg Temperature</h3>
              <p>{avgTemp.toFixed(1)} °C</p>
            </div>
          </div>

          {/* Chart */}
          <div style={styles.chartCard}>
            <Bar data={chartData} />
          </div>

          {/* Buttons */}
          <div style={styles.buttonContainer}>
            
             
          </div>
        </div>
      </div>
    </div>
   </>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "1px 10px 30px rgba(0.4,0,0.2,0.3)",
    backdropFilter: "blur(8px)",
  },
  heading: {
    textAlign: "center",
    color: "#2E7D32",
    fontSize: "32px",
    marginBottom: "40px",
    fontWeight: "700",
  },
  summaryContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  card: {
    flex: "1",
    minWidth: "220px",
    background: "rgba(76, 175, 80, 0.1)",
    borderRadius: "18px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    fontSize: "16px",
  },
  chartCard: {
    padding: "25px",
    background: "rgba(255,255,255,0.9)",
    borderRadius: "18px",
    boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  btn: {
    background: "linear-gradient(90deg, #66BB6A, #81C784)",
    color: "white",
    border: "none",
    padding: "14px 28px",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};

export default DashboardPage;



// src/DashboardPage.js
