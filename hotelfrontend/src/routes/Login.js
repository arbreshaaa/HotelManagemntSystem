import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7247/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Save token and roles to localStorage or state if needed
        onLoginSuccess(data.token, data.roles);
        setEmail("");
        setPassword("");
        setError(null);

        if (data.roles.includes('Admin')) {
          navigate('/Admin');
        } else if (data.roles.includes('User')) {
          navigate('/Home');
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleOnSubmit}>
          <TextField
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            fullWidth
            margin="normal"
          />
          <TextField
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            fullWidth
            margin="normal"
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Button type="submit" variant="contained" color="primary" style={styles.button}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundImage: "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/fb/7d/4d/night-hotel-bangkok-sukhumvit.jpg?w=700&h=-1&s=1')", // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "40px 30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "300px",
    textAlign: "center",
    opacity: "0.9",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  button: {
    marginTop: "20px",
    width: "100%",
  },
};

export default Login;
