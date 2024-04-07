import "../App.css";
import logo from "../assets/logo.png";

// eslint-disable-next-line react/prop-types
const Dashboard = ({ handleLogout }) => {
  const logOut = () => {
    handleLogout();
  };

  return (
    <div>
      <img className="logo" src={logo} alt="logo" />
      <h1>Welcome to Dashboard</h1>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Dashboard;
