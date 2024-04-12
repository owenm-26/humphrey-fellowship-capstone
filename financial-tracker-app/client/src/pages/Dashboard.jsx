import "../App.css";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Layout, theme, Row, Col, Button, Input, Form, Typography } from "antd";
const { TextArea } = Input;
const { Header, Footer, Content } = Layout;
import "../styles/dashboard.css";
import CustomTable from "../components/Table";

const PORT = import.meta.env.VITE_PORT;

// eslint-disable-next-line react/prop-types
const Dashboard = ({ handleLogout }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [businessId, setBusinessId] = useState();
  const [finances, setFinances] = useState();

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);

  const [isLoggingInventory, setIsLoggingInventory] = useState(false);

  const logOut = () => {
    handleLogout();
  };

  // save token from local storage
  useEffect(() => {
    const getToken = async () => {
      setToken(localStorage.getItem("token"));
    };
    getToken();
  }, []);

  // get userId by decrypting token
  //DEPENDENCY: token
  useEffect(() => {
    getUserId(token);
  }, [token]);

  // get userData by Id
  //DEPENDENCY: userId
  useEffect(() => {
    getUserDataById(userId);
  }, [userId]);

  // get businessId from userData
  //DEPENDENCY: userData
  useEffect(() => {
    if (!userData) return;
    setBusinessId(userData.finances);
  }, [userData]);

  // get finances by businessId
  //DEPENDENCY: businessId
  useEffect(() => {
    console.log("businessId:", businessId);
    getFinancesById(businessId);
  }, [businessId]);

  // add new inventory item
  const addInventoryItem = async (businessId, itemData) => {
    if (!businessId || !itemData) return;
    itemData["date"] = new Date();
    console.log("itemData:", itemData);
    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/dashboard/addInventoryItem/${businessId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsLoggingInventory(false);
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getFinancesById = async (businessId) => {
    if (!businessId) return;
    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/dashboard/getFinancesById/${businessId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status == 200) {
        setFinances(data.finances);
        console.log("getFinancesById worked!", data.finances);
        return;
      }
      console.log("Error data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  const generateReport = async () => {
    console.log("Generating report...");
    console.log("Done!");
  };

  // FRONTEND
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //makes date readible
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={logOut}>Logout</Button>
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
            height: "100vh",
          }}
        >
          <Row style={{ justifyContent: "center", height: "70vh" }}>
            <Col
              style={{
                backgroundColor: "aliceblue",

                margin: 5,
              }}
              span={6}
            >
              <Typography.Title level={2} className="section-header">
                {" "}
                Inventory
              </Typography.Title>
              <Button
                onClick={() => setIsLoggingInventory(!isLoggingInventory)}
              >
                {isLoggingInventory ? "Close" : "Add"}
              </Button>
              {isLoggingInventory ? (
                <Form
                  style={{
                    minHeight: 280,
                    borderRadius: 0,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "20px",
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={() => {
                    if (itemName.length < 1) {
                      alert("Please give the item a name");
                      return;
                    }
                    if (quantity < 1) {
                      alert("Please give a positive quantity");
                      return;
                    }
                    addInventoryItem(businessId, {
                      itemName,
                      quantity,
                      cost,
                    });
                    setItemName("");
                    setQuantity(0);
                    setCost(0);
                  }}
                >
                  <Form.Item label="Item Name">
                    <Input
                      type="text"
                      placeholder="Item Name"
                      allowClear
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      rules={[
                        {
                          required: true,
                          message: "Please input an item name",
                        },
                      ]}
                    />{" "}
                  </Form.Item>
                  <Form.Item label="Quantity">
                    <Input
                      type="number"
                      placeholder="Quantity"
                      allowClear
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value, 10))
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please input a quantity",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item label="Total Cost">
                    <Input
                      type="number"
                      placeholder="Total Cost"
                      allowClear
                      value={cost}
                      onChange={(e) => setCost(parseInt(e.target.value, 10))}
                      rules={[
                        {
                          required: true,
                          message: "Please input a cost",
                        },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Record Inventory
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <div className="custom-table">
                  <CustomTable
                    style={{
                      minHeight: 280,
                      borderRadius: 0,
                      width: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "20px",
                    }}
                    columns={[
                      {
                        title: "Name",
                        dataIndex: "name",
                        width: 80,
                      },
                      {
                        title: "Quantity",
                        dataIndex: "quantity",
                        width: 100,
                      },
                      {
                        title: "Price",
                        dataIndex: "buyPrice",
                        width: 70,
                      },
                      {
                        title: "Date",
                        dataIndex: "date",
                        width: 100,
                        render: (text, record) => formatDate(record.date),
                      },
                    ]}
                    data={finances?.supplies}
                  />
                </div>
              )}
            </Col>
            <Col
              style={{
                backgroundColor: "aliceblue",
                margin: 5,
              }}
              span={6}
            >
              Record Sales
            </Col>
            <Col
              style={{
                backgroundColor: "aliceblue",
                margin: 5,
              }}
              span={6}
            >
              Record Expenses
            </Col>
          </Row>
          <Row style={{ justifyContent: "center", marginTop: "80px" }}>
            <Col span={12}>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                size={"large"}
                onClick={generateReport}
              >
                Generate Report
              </Button>
            </Col>
          </Row>
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