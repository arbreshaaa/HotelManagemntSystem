// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import HotelForm from "./routes/HotelForm";
import Register from "./routes/Register";
import Admin from "./routes/Admin";


function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const handleLoginSuccess = (token) => {
    setToken(token);
    localStorage.setItem("authToken", token);
  };

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/HotelForm" />} />
        <Route path="home" element={<Home />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/hotelForm"
          element={token ? <HotelForm /> : <Navigate to="/Login" />}
        />
        <Route path="register" element={<Register />}></Route>
        <Route path="admin" element={<Admin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
