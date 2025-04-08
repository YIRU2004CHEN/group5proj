import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser({ name: "User" });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/tasks"
          element={
            user ? (
              <div>
                <h2>Welcome, {user.name}!</h2>
                <TaskForm />
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

export default App;