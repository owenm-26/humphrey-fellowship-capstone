import { useState } from "react";
import "./App.css";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState();
  const [pwd, setPwd] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [business, setBusiness] = useState();

  const handleRegister = (values) => {
    setProfile(values);
    setUser(values.username);
    setPwd(values.password);
    setPhone(values.phoneNumber);
    setBusiness(values.business);
    setEmail(values.email);
    setIsLoggedIn(true);
  };

  return (
    <>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          ) : (
            // If user is not logged in, show Login page
            <>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Navigate to="/" />} />
            </>
          )}
          <Route
            path="/register"
            element={<Register handleRegister={handleRegister} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
