import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import TaskList from "./TaskList";
import Introduction from './Introduction';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Wait for localStorage check

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token && name) {
      setUser({ name });
    }

    setLoading(false); // ✅ Done checking
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUser(null);
  };

  return (
    <Router>
      <nav
        style={{
          backgroundColor: "#1f2937",
          padding: "12px 24px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>Task Manager</div>
        <div style={{ display: "flex", gap: "16px" }}>
          {!user && (
            <>
              <Link to="/login" style={navLinkStyle}>Login</Link>
              <Link to="/register" style={navLinkStyle}>Register</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/tasks" style={navLinkStyle}>Tasks</Link>
              <button onClick={handleLogout} style={logoutButtonStyle}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/intro" element={<Introduction />} />           
        <Route
          path="/tasks"
          element={
            loading ? (
              <div style={{ textAlign: "center", marginTop: "30px" }}>Loading...</div>
            ) : user ? (
              <div>
                <h2 style={{ textAlign: "center", marginTop: "20px" }}>
                  Welcome, {user.name}!
                </h2>
                <TaskList />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

// 🔸 Styles
const navLinkStyle = {
  color: "white",
  textDecoration: "none",
};

const logoutButtonStyle = {
  backgroundColor: "#ef4444",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default App;
