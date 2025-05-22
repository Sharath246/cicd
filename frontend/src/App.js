import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Home from "./home/home"; // dummy component
import Register from "./register/register";
import Landing from "./landing/landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
