import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodOrderedCreate from "./components/FoodOrderedCreate";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Food from "./components/Food";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState<string | null>();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  if (!token) {
    return (
      <SignIn />
    );
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<FoodOrderedCreate />} />
          <Route path="/history" element={<Food />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
