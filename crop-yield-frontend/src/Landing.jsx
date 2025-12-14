import "./Landing.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Landing() {
  const backgrounds = [
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?auto=format&fit=crop&w=1500&q=80",
  ];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 2000); // change background every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="landing-container"
      style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
    >
      <div className="overlay">
        <nav className="navbar">
          <h2 className="logo">SmartFarm AI</h2>
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </nav>

        <header className="hero fade-in">
          <div className="hero-text slide-in-left">
            <h1>Smart Farming with AI 🌾</h1>
            <p>
              Predict crop yields, get AI-powered recommendations, and make
              data-driven farming decisions.
            </p>
            <Link to="/home">
              <button className="glow-btn">Get Started</button>
            </Link>
          </div>
          <div className="hero-image slide-in-right">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3050/3050525.png"
              alt="Farm Illustration"
            />
          </div>
        </header>

        <section className="features fade-in">
          <div className="feature hover-zoom">
            <img src="https://cdn-icons-png.flaticon.com/512/4149/4149754.png" />
            <h3>Crop Prediction</h3>
            <p>Get accurate yield predictions based on soil and weather data.</p>
          </div>
          <div className="feature hover-zoom">
            <img src="https://cdn-icons-png.flaticon.com/512/3662/3662679.png" />
            <h3>Smart Recommendations</h3>
            <p>AI suggests best crops for your land and season.</p>
          </div>
          <div className="feature hover-zoom">
            <img src="https://cdn-icons-png.flaticon.com/512/7078/7078262.png" />
            <h3>Weather Insights</h3>
            <p>Get accurate, real-time forecasts and rainfall predictions.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
