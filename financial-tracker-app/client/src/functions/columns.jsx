import { Space } from "antd";
const PORT = import.meta.env.VITE_PORT;

// //makes date readible
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const options = { year: "numeric", month: "short", day: "2-digit" };
//   return date.toLocaleDateString("en-US", options);
// };

// // delete inventory item
// const deleteItem = async (currentView, businessId, id) => {
//   // console.log("deleteItem working..");
//   // return;
//   console.log(currentView, id);
//   if (!currentView || !businessId || !id) return;
//   try {
//     const response = await fetch(
//       `http://localhost:${PORT}/api/dashboard/deleteItem/${currentView}/${businessId}/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data.message);
//       console.log(data.finances);
//       setFinances((prevState) => {
//         const updatedFinances = { ...prevState };
//         // Here you need to filter out the deleted item based on currentView
//         updatedFinances[currentView] = updatedFinances[currentView].filter(
//           (item) => item._id !== id
//         );
//         return updatedFinances;
//       });
//       return;
//     } else {
//       console.log("Delete Failed");
//       return;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
// // Table Columns
// export const inventoryColumns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     width: 80,
//     align: "center",
//   },
//   {
//     title: "Quantity",
//     dataIndex: "quantity",
//     width: 100,
//     align: "center",
//   },
//   {
//     title: "Unit Cost",
//     dataIndex: "buyPrice",
//     width: 70,
//     render: (text) => `$${text}`,
//     align: "center",
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//     width: 100,
//     render: (text, record) => formatDate(record.date),
//     align: "center",
//   },
//   {
//     title: "Action",
//     key: "action",
//     width: 40,
//     render: (_, record) => (
//       <Space size="middle">
//         <a
//           onClick={() =>
//             deleteItem("supplies", "661898401378f175c362b83b", record._id)
//           }
//         >
//           Delete
//         </a>{" "}
//         {/* COMPLETE LATER*/}
//       </Space>
//     ),
//     align: "center",
//   },
// ];

// export const expensesColumns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     width: 80,
//     align: "center",
//   },
//   {
//     title: "Cost",
//     dataIndex: "cost",
//     width: 70,
//     render: (text) => `$${text}`,
//     align: "center",
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//     width: 100,
//     render: (text, record) => formatDate(record.date),
//     align: "center",
//   },
//   {
//     title: "Action",
//     key: "action",
//     width: 40,
//     render: (_, record) => (
//       <Space size="middle">
//         <a onClick={() => console.log("Delete Inventory", record._id)}>
//           Delete
//         </a>{" "}
//         {/* COMPLETE LATER*/}
//       </Space>
//     ),
//     align: "center",
//   },
// ];

// export const salesColumns = [
//   {
//     title: "Item Name",
//     dataIndex: "name",
//     width: "80",
//     align: "center",
//   },
//   {
//     title: "Quantity",
//     dataIndex: "quantity",
//     width: "100",
//     align: "center",
//   },
//   {
//     title: "Sale Price",
//     dataIndex: "sellCost",
//     width: "70",
//     render: (text) => `$${text}`,
//     align: "center",
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//     width: "100",
//     align: "center",
//   },
//   {
//     title: "Action",
//     key: "action",
//     width: 40,
//     render: (_, record) => (
//       <Space size="middle">
//         <a onClick={() => console.log("Delete Sale:", record._id)}>Delete</a>{" "}
//         {/* COMPLETE LATER*/}
//       </Space>
//     ),
//     align: "center",
//   },
// ];
