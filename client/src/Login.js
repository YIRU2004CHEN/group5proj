import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      setUser({ name: email });
      navigate("/tasks");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  // 👇 样式变量
  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "12px"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  };

  return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh"
      }}>
        <div style={{
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          minWidth: "320px"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Login</button>
          </form>
          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
  );
};

export default Login;
