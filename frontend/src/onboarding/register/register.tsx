import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/register", {
        username:username,
        email: email,
        password: password,
      });

      if (response.data === "Success") {
        sessionStorage.setItem('user',email);
        navigate("/home");
      } else if (response.data === "Failed") {
        alert("Registration Failed");
      } else {
        alert("Unexpected response from server");
      }
    } catch (error) {
      alert("Error occurred during registration");
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button type="submit">Register</button>
        <p style={{ textAlign: "center" }}>
          Have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;