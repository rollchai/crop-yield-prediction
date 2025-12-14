// src/ProfitLossPage.js
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Header"
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

function ProfitLossPage() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    year: "",
    crop: "",
    yield: "",
    cost: "",
    pricePerTon: "",
  });

  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  // Trigger animation on page mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50); // slight delay
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const { year, crop, yield: y, cost, pricePerTon } = formData;

    if (!year || !crop || !y || !cost || !pricePerTon) {
      alert("Please fill all fields!");
      return;
    }

    const yieldValue = parseFloat(y);
    const price = parseFloat(pricePerTon);
    const costValue = parseFloat(cost);
    const revenue = yieldValue * price;
    const profit = revenue - costValue;

    const newRecord = { ...formData, revenue, profit };
    setRecords([...records, newRecord]);
    setFormData({ year: "", crop: "", yield: "", cost: "", pricePerTon: "" });
  };

  const totalProfit = records.reduce((acc, rec) => acc + rec.profit, 0);

  const chartData = {
    labels: records.map((r) => r.year),
    datasets: [
      {
        label: "Profit (₹)",
        data: records.map((r) => r.profit),
        backgroundColor: records.map((r) =>
          r.profit >= 0 ? "rgba(76, 175, 80, 0.7)" : "rgba(244, 67, 54, 0.7)"
        ),
        borderRadius: 10,
      },
    ],
  };

  return (
    <>
    <Topbar/>
    <Sidebar/>
    <div
      style={{
        ...styles.container,
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(40px)",
      }}
    >
      <h2 style={styles.heading}>🌾 Profit–Loss Analysis</h2>

      <form
        onSubmit={handleAdd}
        style={{
          ...styles.form,
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(40px)",
          transitionDelay: "0.1s",
        }}
      >
        {["year", "crop", "yield", "cost", "pricePerTon"].map((field, i) => (
          <input
            key={i}
            type={field === "crop" ? "text" : "number"}
            step="0.01"
            name={field}
            placeholder={
              field === "year"
                ? "Year"
                : field === "yield"
                ? "Yield (tons)"
                : field === "cost"
                ? "Total Cost (₹)"
                : field === "pricePerTon"
                ? "Price per Ton (₹)"
                : field
            }
            value={formData[field]}
            onChange={handleChange}
            style={styles.input}
          />
        ))}
        <button type="submit" style={styles.addBtn}>
          ➕ Add Record
        </button>
      </form>

      {records.length > 0 ? (
        <>
          <div
            style={{
              ...styles.chartCard,
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(40px)",
              transitionDelay: "0.2s",
            }}
          >
            <Bar data={chartData} />
          </div>

          <h3
            style={{
              ...styles.totalProfit,
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(40px)",
              transitionDelay: "0.3s",
            }}
          >
            Total Profit: <span>₹{totalProfit.toFixed(2)}</span>
          </h3>

          <button
            onClick={() => navigate("/rewards", { state: { totalProfit } })}
            style={{
              ...styles.rewardBtn,
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(40px)",
              transitionDelay: "0.4s",
            }}
          >
            🎁 View My Rewards
          </button>

          <div
            style={{
              ...styles.tableWrapper,
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(40px)",
              transitionDelay: "0.5s",
            }}
          >
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeadRow}>
                  <th>Year</th>
                  <th>Crop</th>
                  <th>Yield (tons)</th>
                  <th>Revenue (₹)</th>
                  <th>Cost (₹)</th>
                  <th>Profit/Loss (₹)</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i} style={styles.tableRow}>
                    <td>{r.year}</td>
                    <td>{r.crop}</td>
                    <td>{r.yield}</td>
                    <td>{r.revenue}</td>
                    <td>{r.cost}</td>
                    <td style={{ color: r.profit >= 0 ? "#2E7D32" : "#C62828" }}>
                      {r.profit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p
          style={{
            marginTop: "20px",
            color: "#555",
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(40px)",
            transitionDelay: "0.3s",
          }}
        >
          No records added yet. Start by adding one! 🌱
        </p>
      )}
    </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    minHeight: "30vh",
    margin: "50px auto",
    padding: "50px",
    background: "linear-gradient(180deg, #E8F5E9 0%, #FFFFFF 100%)",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    transition: "all 0.6s ease",
  },
  heading: {
    color: "#1B5E20",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "25px",
    fontFamily: "'Poppins', sans-serif",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
    transition: "all 0.6s ease",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1.5px solid #A5D6A7",
    background: "#F9FFF9",
    transition: "0.4s ease",
    fontFamily: "'Poppins', sans-serif",
  },
  addBtn: {
    gridColumn: "1 / -1",
    padding: "14px",
    background: "linear-gradient(90deg, #43A047, #66BB6A)",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.4s ease",
  },
  chartCard: {
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    marginTop: "25px",
    transition: "all 0.5s ease",
  },
  totalProfit: {
    marginTop: "30px",
    color: "#2E7D32",
    fontSize: "22px",
    fontWeight: "700",
    transition: "all 0.5s ease",
  },
  rewardBtn: {
    marginTop: "25px",
    background: "linear-gradient(90deg, #66BB6A, #43A047)",
    color: "white",
    padding: "14px 30px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "600",
    transition: "all 0.5s ease",
  },
  tableWrapper: {
    marginTop: "35px",
    overflowX: "auto",
    transition: "all 0.5s ease",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "'Poppins', sans-serif",
  },
  tableHeadRow: {
    background: "#C8E6C9",
    color: "#1B5E20",
  },
  tableRow: {
    background: "#F1F8E9",
    transition: "all 0.3s ease",
  },
};

export default ProfitLossPage;
