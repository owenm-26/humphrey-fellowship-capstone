import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Dashboard />
              ) : (
                <Register handleRegister={handleRegister} />
              )
            }
          >
            <Route
              path="/dashboard"
              element={<Dashboard />}
              //   isLoggedIn ? (
              //     <Dashboard />
              //   ) : (
              //     <Register handleRegister={handleRegister} />
              //   )
              // }
            ></Route>
            <Route
              path="/register"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Dashboard />
                ) : (
                  <Register handleRegister={handleRegister} />
                )
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
