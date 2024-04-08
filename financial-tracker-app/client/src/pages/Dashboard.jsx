import "../App.css";
import logo from "../assets/logo.png";
// import User from "../models.js";
import { useEffect, useState } from "react";

const PORT = import.meta.env.VITE_PORT

// eslint-disable-next-line react/prop-types
const Dashboard = ({ userInfo, handleLogout }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
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
    getUserId(token);
  }, [token]);

  useEffect(() => {
    getUserDataById(userId);
  }, [userId]);

  // convert JWT into userId
  const getUserId = async (token) => {
    if (!token) {
      return;
    }
    console.log("token:", token);
    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/dashboard/token/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setUserId(data.userId);
      console.log("getUserId worked!", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // get user info by Id
  const getUserDataById = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/dashboard/getUserById/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status == 200) {
        setUserData(data.userData);
        console.log("getUserDatabyId worked!", data.userData);
        return;
      }
      console.log("Error data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <img className="logo" src={logo} alt="logo" />
      <h1>Welcome to Dashboard</h1>
      <h1>UserInfo:{userData ? userData.business : ""}</h1>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Dashboard;
