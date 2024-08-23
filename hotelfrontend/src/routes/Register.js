import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Register({ onRegisterSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7247/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("User Registered");
        onRegisterSuccess(data.token);
        setEmail("");
        setPassword("");
        setError(null);
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("User register successfully");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleOnSubmit}>
          <TextField
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            fullWidth
            margin="normal"
            style={styles.input}
          />
          <TextField
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            fullWidth
            margin="normal"
            style={styles.input}
          />
          {error && <div style={styles.error}>{error}</div>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={styles.button}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundImage:
      "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/fb/7d/4d/night-hotel-bangkok-sukhumvit.jpg?w=700&h=-1&s=1')", // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "30px 40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "400px",
    maxWidth: "90%",
    opacity: "0.9",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
  },
  input: {
    backgroundColor: "white",
  },
  button: {
    marginTop: "20px",
    width: "100%",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default Register;
