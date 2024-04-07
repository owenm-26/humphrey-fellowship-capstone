import "../App.css";
import logo from "../assets/logo.png";
// import User from "../models.js";
import { useEffect, useState } from "react";

const PORT = import.meta.env.VITE_PORT

// eslint-disable-next-line react/prop-types
const Dashboard = ({ userInfo, handleLogout }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");
  const logOut = () => {
    handleLogout();
  };

  useEffect(() => {
    const getToken = async () => {
      setToken(localStorage.getItem("token"));
    };
    getToken();
  }, []);

  useEffect(() => {
    getUserData(token);
  }, [token]);

  const getUserData = async (token) => {
    console.log(token);
    // try {
    //   const response = await fetch(`http://localhost:${PORT}/api/info/token`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(token),
    //   });

    //   const data = await response.json();
    //   setUserData(data);
    //   console.log("getUserData worked!");
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <div>
      <img className="logo" src={logo} alt="logo" />
      <h1>Welcome to Dashboard</h1>
      <h1>UserInfo:{userData}</h1>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Dashboard;
