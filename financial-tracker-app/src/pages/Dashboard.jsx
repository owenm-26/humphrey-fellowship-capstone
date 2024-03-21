import React from "react";
import "../App.css";
import logo from "../assets/logo.png";

const Dashboard = () => {
  return (
    <div>
      <img className="logo" src={logo} alt="logo" />
      <h1>Welcome to Dashboard</h1>
    </div>
  );
};

export default Dashboard;
