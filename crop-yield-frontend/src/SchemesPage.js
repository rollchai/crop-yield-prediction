// src/SchemesPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

function SchemesPage() {
  const navigate = useNavigate();

  const schemes = [
    {
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      desc: "Provides insurance coverage and financial support to farmers in case of crop failure due to natural calamities, pests, or diseases.",
      link: "https://pmfby.gov.in/",
    },
    {
      name: "Soil Health Card Scheme",
      desc: "Promotes soil testing and provides farmers with soil health cards to guide fertilizer use and improve productivity.",
      link: "https://soilhealth.dac.gov.in/",
    },
    {
      name: "Kisan Credit Card (KCC)",
      desc: "Offers farmers short-term credit for crop production and agricultural needs at low-interest rates.",
      link: "https://www.india.gov.in/spotlight/kisan-credit-card-scheme",
    },
    {
      name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
      desc: "Aims to provide irrigation facilities and promote water-use efficiency through micro-irrigation systems.",
      link: "https://pmksy.gov.in/",
    },
    {
      name: "National Mission for Sustainable Agriculture (NMSA)",
      desc: "Focuses on climate-resilient farming practices to enhance agricultural productivity sustainably.",
      link: "https://nmsa.dac.gov.in/",
    },
  ];

  return (
    <div style={container}>
      <h2 style={heading}>🌿 Government Schemes for Farmers</h2>

      <div style={cardsContainer}>
        {schemes.map((scheme, index) => (
          <div
            key={index}
            style={{
              ...card,
              animation: `slideUp 0.6s ease forwards`,
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
            }}
          >
            <div style={cardContent}>
              <h3 style={cardTitle}>{scheme.name}</h3>
              <p style={cardDesc}>{scheme.desc}</p>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                🔗 Visit Official Site
              </a>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/dashboard")} style={btnStyle}>
        ⬅ Back to Dashboard
      </button>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateY(40px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

const container = {
  maxWidth: "1000px",
  margin: "40px auto",
  padding: "20px",
  background: "linear-gradient(180deg, #E8F5E9 0%, #ffffff 100%)",
  borderRadius: "16px",
  textAlign: "center",
  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
  fontFamily: "'Poppins', sans-serif",
};

const heading = {
  color: "#2E7D32",
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "30px",
};

const cardsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const card = {
  background: "#ffffff",
  padding: "20px 25px",
  borderRadius: "14px",
  boxShadow: "4px 4px 20px rgba(46, 125, 50, 0.3)", // greenish shadow
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

const cardContent = {
  textAlign: "left",
  flex: 1,
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#2E7D32",
  marginBottom: "8px",
};

const cardDesc = {
  fontSize: "14px",
  color: "#555",
  marginBottom: "10px",
};

const linkStyle = {
  color: "#1B5E20",
  textDecoration: "none",
  fontWeight: "600",
};

const btnStyle = {
  marginTop: "30px",
  background: "linear-gradient(90deg, #66BB6A, #81C784)",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
  transition: "all 0.3s ease",
};

export default SchemesPage;
