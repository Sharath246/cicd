import React from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to Our App</h1>
        <p>Please log in or register to continue.</p>
        <div className="button-group">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
