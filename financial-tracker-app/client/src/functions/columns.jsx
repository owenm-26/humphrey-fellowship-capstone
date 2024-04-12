import { Space } from "antd";

//makes date readible
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
};

// Table Columns
export const inventoryColumns = [
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
        <a onClick={() => console.log("Delete Inventory", record._id)}>
          Delete
        </a>{" "}
        {/* COMPLETE LATER*/}
      </Space>
    ),
    align: "center",
  },
];

export const expensesColumns = [
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
        <a onClick={() => console.log("Delete Inventory", record._id)}>
          Delete
        </a>{" "}
        {/* COMPLETE LATER*/}
      </Space>
    ),
    align: "center",
  },
];

export const salesColumns = [
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
        <a onClick={() => console.log("Delete Sale:", record._id)}>Delete</a>{" "}
        {/* COMPLETE LATER*/}
      </Space>
    ),
    align: "center",
  },
];
