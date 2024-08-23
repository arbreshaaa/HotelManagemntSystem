import React from "react";
import { Link } from "react-router-dom";

// src/pages/Home.js

const HotelForm = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Happy to see you here</h1>
        <div style={styles.buttonContainer}>
          <Link to="/login" style={styles.button}>
            Login
          </Link>
          <Link to="/register" style={styles.button}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
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
    padding: "40px 30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px #00ffff",
    textAlign: "center",
    width: "300px",
    opacity:"0.9"
  },
  heading: {
    color: "#696969",
    textShadow: "#00ffff",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    textDecoration: "none",
    color: "white",
    backgroundColor: "#007BFF",
    padding: "10px 20px",
    borderRadius: "5px",
    margin: "0 10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default HotelForm;
