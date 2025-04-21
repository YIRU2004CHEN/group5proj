// Import necessary modules
import React, { useState } from 'react'; // React and useState for state management
import axios from 'axios';              // Axios for HTTP requests
import { Link } from 'react-router-dom'; // Link for navigation

// Backend API base URL
const API_URL = "http://localhost:5000/api";

// Register component receives setUser as prop
const Register = ({ setUser }) => {
  // Local state for form fields and messages
  const [name, setName] = useState("");           // User's name input
  const [email, setEmail] = useState("");         // User's email input
  const [password, setPassword] = useState("");   // User's password input
  const [error, setError] = useState("");         // Error message display
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(""); // Success message

  // Form submission handler
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload
    setIsSubmitting(true); // Show loading state

    try {
      // Send POST request to backend to register user
      const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });

      // Show success message
      setSuccessMessage(`Welcome, ${response.data.name || name}! Registration successful.`);
      setError(""); // Clear any previous errors
      setName(""); setEmail(""); setPassword(""); // Reset form fields
    } catch (err) {
      // Handle errors and display message
      const message = err.response?.data?.message || "Registration failed";
      console.error("Registration error:", message);
      setError(message);
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  // 👇 Shared inline styles for input and button components
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
    backgroundColor: "#10b981", // Tailwind green-500
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  };

  // Component UI
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
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>

        {/* Show error or success message */}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}

        {/* Registration form */}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
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

          {/* Submit button with loading state */}
          <button type="submit" disabled={isSubmitting} style={buttonStyle}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Navigation link to login page */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register; // Export the Register component

