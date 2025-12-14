// src/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/home", label: "🏠 Home" },
    { to: "/history", label: "📜 History" },
    { to: "/dashboard", label: "📈 Dashboard" },
    { to: "/schemes", label: "🌱 Schemes" },
    { to: "/profit-loss", label: "💰 Profit/Loss" },
  ];

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#1B5E20" : "#fff",
    fontWeight: location.pathname === path ? "bold" : "500",
    textDecoration: "none",
    padding: "12px 18px",
    margin: "6px 0",
    borderRadius: "8px",
    display: "block",
    transition: "all 0.3s ease",
    background: location.pathname === path ? "rgba(255,255,255,0.2)" : "transparent",
  });

  return (
    <div style={sidebarStyle}>
      <div style={logoContainer}>
        <span style={logoEmoji}>🌾</span>
        <h2 style={logoText}>Smart Farm</h2>
      </div>

      <nav style={navStyle}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={linkStyle(link.to)}
            onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.15)")}
            onMouseLeave={(e) =>
              (e.target.style.background =
                location.pathname === link.to ? "rgba(255,255,255,0.2)" : "transparent")
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

const sidebarStyle = {
  width: "220px",
  height: "100vh",
  background: "linear-gradient(180deg, #43A047, #2E7D32)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "25px 20px",
  boxShadow: "2px 0 12px rgba(0,0,0,0.15)",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "30px",
};

const logoEmoji = {
  fontSize: "28px",
};

const logoText = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#fff",
  fontFamily: "'Poppins', sans-serif",
};

const navStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

export default Sidebar;
