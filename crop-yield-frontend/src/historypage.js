import React, { useEffect, useState } from "react";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("predictionHistory")) || [];
    setHistory(saved);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 className="slide-left" style={styles.heading}>📊 Prediction History</h2>

        {history.length === 0 ? (
          <div className="slide-right" style={styles.noData}>
            🌱 No predictions yet! <br /> Go to the Predict Yield page and submit a form.
          </div>
        ) : (
          <div className="slide-up" style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th>Crop</th>
                  <th>Soil pH</th>
                  <th>Rainfall (mm)</th>
                  <th>Temperature (°C)</th>
                  <th>Predicted Yield (tons/ha)</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr key={idx} className="slide-up" style={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td style={styles.cell}>{item.Crop}</td>
                    <td style={styles.cell}>{item.Soil_pH}</td>
                    <td style={styles.cell}>{item.Rainfall}</td>
                    <td style={styles.cell}>{item.Avg_Temperature}</td>
                    <td style={styles.cell}>{item.predicted_yield}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes slideLeft {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }

          @keyframes slideRight {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }

          @keyframes slideUp {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          .slide-left {
            animation: slideLeft 0.8s ease-out forwards;
          }

          .slide-right {
            animation: slideRight 0.8s ease-out forwards;
          }

          .slide-up {
            animation: slideUp 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "70vh",
        marginTop:"40px", 
    display: "flex",
    justifyContent: "center",
    background: "#ffffffff",
    fontFamily: "'Poppins', sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "1000px",
    background: "#ffffff",
    borderRadius: "20px", 
    padding: "30px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  },

  heading: {
    textAlign: "center",
    color: "#2E7D32",
    fontSize: "28px",
    marginBottom: "30px",
    fontWeight: "700",
  },

  noData: {
    textAlign: "center",
    color: "#1B5E20",
    fontSize: "18px",
    padding: "25px",
    borderRadius: "15px",
    background: "rgba(200, 230, 201, 0.3)",
    fontWeight: "600",
  },

  tableContainer: {
    overflowX: "auto",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
    fontSize: "18px",
    textAlign: "left",
  },

  thead: {
    backgroundColor: "#C8E6C9",
    fontWeight: "700",
    fontSize: "17px",
  },

  rowEven: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #d0d0d0",
  },

  rowOdd: {
    backgroundColor: "#f0fff0",
    borderBottom: "1px solid #d0d0d0",
  },

  cell: {
    padding: "12px 10px",
    fontSize: "17px",
  },
};

export default HistoryPage;
