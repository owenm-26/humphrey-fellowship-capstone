import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

//FIX LATER
const PORT = 6789

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const verifyUser = async (token) => {
    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/dashboard/dashboard`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        // console.log("Valid JWT!");
        return true;
      }
    } catch (error) {
      console.log("Error:", error);
      return false;
    }
  };

  useEffect(() => {
    // Check if the user is already logged in (e.g., using a token stored in localStorage)
    const token = localStorage.getItem("token");
    if (token) {
      // console.log("Checking token...");
      verifyUser(token).then((isValid) => {
        setIsLoggedIn(isValid);
      });
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard handleLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
