import React from "react";
import { useLocation } from "react-router-dom";

function RewardPage() {
  const location = useLocation();
  const totalProfit = location.state?.totalProfit || 0;

  const getReward = (profit) => {
    if (profit >= 500000) return { tier: "Platinum 💎", points: 500, message: "Incredible! You’ve earned the Platinum reward!" };
    if (profit >= 200000) return { tier: "Gold 🥇", points: 200, message: "Outstanding! You’ve reached the Gold level!" };
    if (profit >= 100000) return { tier: "Silver 🥈", points: 100, message: "Great job! You’ve achieved the Silver tier!" };
    if (profit >= 50000) return { tier: "Bronze 🥉", points: 50, message: "Good effort! You’ve earned the Bronze reward!" };
    return { tier: "No Reward 😅", points: 0, message: "Keep working hard to reach the reward threshold!" };
  };

  const reward = getReward(totalProfit);

  return (
    <div style={styles.container}>
      <h2>🎁 Farmer Reward Center</h2>
      <p>Total Profit: ₹{totalProfit.toFixed(2)}</p>

      <div style={styles.card}>
        <h3>{reward.tier}</h3>
        <p>{reward.message}</p>
        <p><strong>Reward Points:</strong> {reward.points}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    textAlign: "center",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  card: {
    backgroundColor: "#E8F5E9",
    marginTop: "25px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  },
};

export default RewardPage;
