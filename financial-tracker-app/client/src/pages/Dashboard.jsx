import "../App.css";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import {
  Layout,
  theme,
  Row,
  Col,
  Button,
  Input,
  Menu,
  Typography,
  Space,
} from "antd";
const { TextArea } = Input;
const { Header, Footer, Content } = Layout;
import "../styles/dashboard.css";
import CustomTable from "../components/Table";
import InventoryInputForm from "../components/InputForm";


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

  const [isLoggingData, setIsLoggingData] = useState(false);
  const [currentView, setCurrentView] = useState("Inventory");

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
    // console.log("businessId:", businessId);
    getFinancesById(businessId);
  }, [businessId]);

  // add new inventory item
  const addInventoryItem = async (businessId, itemData) => {
    if (!businessId || !itemData) return;
    itemData["date"] = new Date();
    // console.log("itemData:", itemData);
    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/dashboard/inventory/addInventoryItem/${businessId}`,
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
        setIsLoggingData(false);
        console.log(data);
        setItemName("");
        setQuantity(0);
        setCost(0);
        const inventoryToAdd = {
          name: itemData.itemName,
          quantity: itemData.quantity,
          buyPrice: itemData.cost,
          date: itemData.date,
        };

        const newCost = Number(itemData.quantity) * Number(itemData.cost);
        const expenseToAdd = {
          name: itemData.itemName,
          cost: newCost,
          date: itemData.date,
        };
        setFinances((prevState) => {
          const newSupplies = [...prevState.supplies, inventoryToAdd];
          const newExpenses = [...prevState.expenses, expenseToAdd];
          return { ...prevState, supplies: newSupplies, expenses: newExpenses };
        });
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
        // console.log("getFinancesById worked!", data.finances);
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

  //functions that modify inputs to dashboard based on view
  const whichAddFunction = (currentView) => {
    if (currentView == "Inventory") return addInventoryItem;
    else if (currentView == "Sales") return null;
    else if (currentView == "Expenses") return null; //FIX LATER
    else throw new Error("currentView not valid");
  };

  const whichColumnFunction = (currentView) => {
    if (currentView == "Inventory") return inventoryColumns;
    else if (currentView == "Sales") return salesColumns;
    else if (currentView == "Expenses") return expensesColumns;
    else throw new Error("currentView not valid");
  };

  const whichDataFunction = (currentView) => {
    if (currentView == "Inventory") return finances?.supplies;
    else if (currentView == "Sales") return finances?.sales;
    else if (currentView == "Expenses") return finances?.expenses;
    else throw new Error("currentView not valid");
  };

  //makes date readible
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  // delete inventory item
  const deleteItem = async (currentView, businessId, id) => {
    // list of valid views
    const validViews = ["Inventory", "Sales", "Expenses"];
    if (!currentView || !businessId || !id) return;
    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/dashboard/deleteItem/${currentView}/${businessId}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        console.log(data.finances);
        setFinances((prevState) => {
          const updatedFinances = { ...prevState };
          if (updatedFinances && validViews.includes(currentView)) {
            if (currentView === validViews[0]) {
              updatedFinances.supplies = updatedFinances.supplies.filter(
                (item) => item._id !== id
              );
            } else if (currentView === validViews[1]) {
              updatedFinances.sales = updatedFinances.sales.filter(
                (item) => item._id !== id
              );
            } else {
              updatedFinances.expenses = updatedFinances.expenses.filter(
                (item) => item._id !== id
              );
            }
          }
          return updatedFinances;
        });        
        return;
      } else {
        console.log("Delete Failed");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Table Columns
  const inventoryColumns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 80,
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: 100,
      align: "center",
    },
    {
      title: "Unit Cost",
      dataIndex: "buyPrice",
      width: 70,
      render: (text) => `$${text}`,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 100,
      render: (text, record) => formatDate(record.date),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      width: 40,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => deleteItem(currentView, businessId, record._id)}>
            Delete
          </a>{" "}
        </Space>
      ),
      align: "center",
    },
  ];

  const expensesColumns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 80,
      align: "center",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      width: 70,
      render: (text) => `$${text}`,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 100,
      render: (text, record) => formatDate(record.date),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      width: 40,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => deleteItem(currentView, businessId, record._id)}>
            Delete
          </a>{" "}
          {/* COMPLETE LATER*/}
        </Space>
      ),
      align: "center",
    },
  ];

  const salesColumns = [
    {
      title: "Item Name",
      dataIndex: "name",
      width: "80",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "100",
      align: "center",
    },
    {
      title: "Sale Price",
      dataIndex: "sellCost",
      width: "70",
      render: (text) => `$${text}`,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "100",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      width: 40,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => deleteItem(currentView, businessId, record._id)}>Delete</a>{" "}
          {/* COMPLETE LATER*/}
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={logOut} style={{ marginRight: "40px" }}>
          Logout
        </Button>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["Inventory"]}
          onClick={({ key }) => setCurrentView(key)}
          items={[
            { key: "Inventory", label: "Inventory" },
            { key: "Sales", label: "Sales" },
            { key: "Expenses", label: "Expenses" },
          ]}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
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
              span={24}
            >
              {/* Dashboard Body */}{" "}
              <Typography.Title level={2} className="section-header">
                {" "}
                {currentView}
              </Typography.Title>
              <Button onClick={() => setIsLoggingData(!isLoggingData)}>
                {isLoggingData ? "Close" : "Add"}
              </Button>
              {isLoggingData ? (
                <InventoryInputForm
                  businessId={businessId}
                  addItemFunction={whichAddFunction(currentView)}
                />
              ) : (
                <div className="custom-table">
                  <CustomTable
                    className="customTable"
                    columns={whichColumnFunction(currentView)}
                    data={whichDataFunction(currentView)}
                  />
                </div>
              )}
            </Col>
          </Row>
          <Row style={{ justifyContent: "center", marginTop: "80px" }}>
            {/* GENERATE REPORT */}
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

