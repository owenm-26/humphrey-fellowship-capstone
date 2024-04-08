import "../App.css";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { Layout, theme } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import "../styles/dashboard.css";

const PORT = import.meta.env.VITE_PORT;

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
    // console.log("token:", token);
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
      // console.log("getUserId worked!", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // get user info by Id
  const getUserDataById = async (userId) => {
    if (!userId) return;
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
        // console.log("getUserDatabyId worked!", data.userData);
        return;
      }
      console.log("Error data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // FRONTEND
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button onClick={logOut}>Logout</button>
        <h2 style={{ marginLeft: "50%" }}>
          {userData ? userData.business : ""}
        </h2>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Humphrey Fellowship ©{new Date().getFullYear()} Created by Owen Mariani
      </Footer>
    </Layout>
  );
};

export default Dashboard;

{
  /* <div>
      <img className="logo" src={logo} alt="logo" />
      <h1>Welcome to Dashboard</h1>
      </h1>
      
    </div> */
}