import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:8080/login", {
        headers: {
          email: email,
          password: password,
        },
      });

      const message = response.data;

      if (message === "Action Successful") {
        sessionStorage.setItem('user',email);
        navigate("/home");
      } else if (message === "Wrong Password" || message === "User not found") {
        alert(message);
      } else {
        alert("Unexpected response from server");
      }
    } catch (error) {
      alert("Error occurred during login");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p style={{ textAlign: "center" }}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
