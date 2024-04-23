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
import DataInputForm from "../components/InputForm";
import dayjs from "dayjs";
import DownloadReport from "../components/DownloadReport";

const PORT = import.meta.env.VITE_PORT;

// eslint-disable-next-line react/prop-types
const Dashboard = ({ handleLogout }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [businessId, setBusinessId] = useState();
  const [finances, setFinances] = useState();
  const [refresh, setRefresh] = useState(false);

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
  }, [businessId, refresh]);

  useEffect(() =>{
setIsLoggingData(false);
  },[currentView])

  // add new sale
  const addSalesItem = async (businessId, itemData) => {
    if (!businessId || !itemData) return;
    const date = new Date(itemData.date);
    itemData.date = date;
    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/dashboard/sales/addSalesItem/${businessId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      if (response.ok) {
        setRefresh((prevRefresh) => !prevRefresh);
        setIsLoggingData(false);
      } else {
        console.log("Sale log Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // add new expense
  const addExpenseItem = async (businessId, itemData) => {
    if (!businessId || !itemData) return;
    const date = new Date(itemData.date);
    itemData.date = date;
    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/dashboard/expenses/addExpenseItem/${businessId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      if (response.ok) {
        setRefresh((prevRefresh) => !prevRefresh);
        setIsLoggingData(false);
      } else {
        console.log("Expense log Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // add new inventory item
  const addInventoryItem = async (businessId, itemData) => {
    if (!businessId || !itemData) return;
    const date = new Date(itemData.date);
    itemData.date = date;
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
        // const data = await response.json();
        // alert(data.message);
        setIsLoggingData(false);
        setItemName("");
        setQuantity(0);
        setCost(0);
        setRefresh((prevRefresh) => !prevRefresh);
      } else {
        const data = await response.json();
        alert(data.message);
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
    else if (currentView == "Sales") return addSalesItem;
    else if (currentView == "Expenses") return addExpenseItem;
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
        setRefresh((prevRefresh) => !prevRefresh);
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
      title: "Item Name",
      dataIndex: "name",
      width: "20%",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "10%",
      align: "center",
    },
    {
      title: "Unit Cost",
      dataIndex: "buyPrice",
      width: "20%",
      render: (text) => `$${text}`,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "20%",
      render: (text, record) => formatDate(record.date),
      align: "center",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        new Date(a.date).getTime() / 1000 - new Date(b.date).getTime() / 1000, //convert into a numerical format that we can sort on
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
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
      title: "Cost Name",
      dataIndex: "name",
      width: "20%",
      align: "center",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      width: "15%",
      render: (text) => `$${text}`,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "20%",
      render: (text, record) => formatDate(record.date),
      align: "center",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        new Date(a.date).getTime() / 1000 - new Date(b.date).getTime() / 1000, //convert into a numerical format that we can sort on
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
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

  const salesColumns = [
    {
      title: "Item Name",
      dataIndex: "name",
      width: "20%",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "10%",
      align: "center",
    },
    {
      title: "Sale Price",
      dataIndex: "sellCost",
      width: "20%",
      render: (text) => `$${text}`,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => formatDate(record.date),
      width: "20%",
      align: "center",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        new Date(a.date).getTime() / 1000 - new Date(b.date).getTime() / 1000, //convert into a numerical format that we can sort on
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
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
      <Content style={{ padding: "0 0px", minHeight:"100vh"}}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            height: "auto",
          }}
        >
          <Row style={{ justifyContent: "center" }}>
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
                <DataInputForm
                  data={finances?.supplies}
                  currentView={currentView}
                  businessId={businessId}
                  addItemFunction={whichAddFunction(currentView)}
                />
              ) : (
                <div className="custom-table" >
                  <CustomTable
                    className="customTable"
                    columns={whichColumnFunction(currentView)}
                    data={whichDataFunction(currentView)}
                    style={{minHeight: "100vh"}}
                  />
                </div>
              )}
            </Col>
          </Row>
          <Row style={{ justifyContent: "center", marginTop: "3%" }}>
            {/* GENERATE REPORT */}
            <Col span={12}>
              <DownloadReport
                data={whichDataFunction(currentView)}
                currentView={currentView}
              />
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

