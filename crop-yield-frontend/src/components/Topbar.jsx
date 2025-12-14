import "./components.css";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can also clear auth data here if needed
    // localStorage.clear();

    navigate("/"); // redirect to home or login page
  };

  return (
    <div className="topbar">
      <h3 className="heading">Welcome, Farmer 👨‍🌾</h3>

      <div className="user-info">
        <img
          src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
          alt="user"
        />
        <span>Sajid</span>

        {/* Hover Profile Cloud */}
        <div className="profile-cloud">
          <h4>Sajid</h4>
          <p>Farmer</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
