import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Dropdown,
  Menu,
  DatePicker,
  InputNumber,
} from "antd";
import dayjs from "dayjs";

const DataInputForm = ({ data, currentView, businessId, addItemFunction }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [date, setDate] = useState(dayjs().format("MM/DD/YYYY"));

  const inventoryItems = data?.map((item, index) => ({
    key: `${item._id}`,
    label: `${item.name}`,
    onClick: () => {
      console.log(item);
      setItemName(item.name);
    },
  }));

  //helper method for how much is left in inventory
  const getAvailableQuantity = (itemName) => {
    const item = data.find((item) => item.name === itemName);
    return item ? item.quantity : 0;
  };

  return (
    <>
      {currentView === "Inventory" ? (
        // INVENTORY FORM
        <Form
          style={{
            background: "#fff",
            minHeight: 280,
            borderRadius: 10,
            padding: "20px",
            margin: "40px",
            width: "calc(100% - 80px)", // Adjust width to fit within parent container
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
            addItemFunction(businessId, {
              quantity,
              itemName,
              cost,
              date: date,
            });
          }}
        >
          <Form.Item label="Item Name">
            <Input
              type="text"
              placeholder="Item Name"
              allowClear
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              style={{ borderRadius: 5 }}
            />
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
              style={{ borderRadius: 5 }}
            />
          </Form.Item>
          <Form.Item label="Cost per Unit">
            <InputNumber
              style={{ borderRadius: 5, display: "flex", width: "100%" }}
              placeholder="Cost per Unit"
              min="0"
              step="1"
              onChange={(value) => {
                if (value !== null) {
                  setCost(parseFloat(value.toFixed(2)));
                }
              }}
            />
            {/* <Input
              type="text" //to allow decimals
              placeholder="Cost per Unit"
              allowClear
              value={cost}
              onChange={}
              
            /> */}
          </Form.Item>

          {/* Date Picker */}
          <Form.Item label="Date">
            <DatePicker
              defaultValue={dayjs(date, "MM/DD/YYYY")}
              onChange={(date, dateString) => {
                setDate(dateString);
                console.log(dateString);
              }}
              format="MM/DD/YYYY"
              style={{ borderRadius: 5, display: "flex", width: "12vw" }}
            ></DatePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Record Inventory
            </Button>
          </Form.Item>
        </Form>
      ) : currentView === "Sales" ? (
        // SALES FORM
        <>
          <Dropdown
            menu={{
              items: inventoryItems,
              selectable: true,
              defaultSelectedKeys: ["3"],
            }}
            placement="bottom"
            trigger={"click"}
          >
            <Button style={{ marginBottom: "20px" }}>Quick Add </Button>
          </Dropdown>
          <Form
            style={{
              background: "#fff",
              minHeight: 280,
              borderRadius: 10,
              padding: "20px",
              margin: "40px",
              width: "calc(100% - 80px)",
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
              const unitsAvailable = getAvailableQuantity(itemName);
              if (quantity > unitsAvailable) {
                alert(
                  `You can't sell more than ${unitsAvailable} units of ${itemName}`
                );
                return;
              }
              addItemFunction(businessId, {
                quantity,
                itemName,
                cost,
                date,
              });
            }}
          >
            <Form.Item label="Item Name">
              <Input
                type="text"
                placeholder="Item Name"
                allowClear
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                style={{ borderRadius: 5 }}
              />
            </Form.Item>
            <Form.Item label="Quantity">
              <Input
                type="number"
                placeholder="Quantity"
                allowClear
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value, 10))}
                style={{ borderRadius: 5 }}
              />
            </Form.Item>
            <Form.Item label="Price per Unit">
              <Input
                type="number"
                placeholder="Price per Unit"
                allowClear
                value={cost}
                onChange={(e) => setCost(parseFloat(e.target.value, 10))}
                style={{ borderRadius: 5 }}
              />
            </Form.Item>
            {/* Date Picker */}
            <Form.Item label="Date">
              <DatePicker
                defaultValue={dayjs(date, "MM/DD/YYYY")}
                onChange={(date, dateString) => {
                  setDate(dateString);
                  console.log(dateString);
                }}
                format="MM/DD/YYYY"
                style={{ borderRadius: 5, display: "flex", width: "12vw" }}
              ></DatePicker>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Record Sale
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        // EXPENSE FORM
        <Form
          style={{
            background: "#fff",
            minHeight: 280,
            borderRadius: 10,
            padding: "20px",
            margin: "40px",
            width: "calc(100% - 80px)", // Adjust width to fit within parent container
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={() => {
            if (itemName.length < 1) {
              alert("Please give the expense a name");
              return;
            }
            if (cost < 0) {
              alert(
                "Please give a positive cost. Enter gains in the sales category."
              );
              return;
            }
            addItemFunction(businessId, {
              itemName,
              cost,
              date,
            });
          }}
        >
          <Form.Item label="Expense Name">
            <Input
              type="text"
              placeholder="Expense Name"
              allowClear
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              style={{ borderRadius: 5 }}
            />
          </Form.Item>
          <Form.Item label="Total Cost ">
            <Input
              type="number"
              placeholder="Total Cost"
              allowClear
              value={cost}
              onChange={(e) => setCost(parseFloat(e.target.value, 10))}
              style={{ borderRadius: 5 }}
            />
          </Form.Item>
          {/* Date Picker */}
          <Form.Item label="Date">
            <DatePicker
              defaultValue={dayjs(date, "MM/DD/YYYY")}
              onChange={(date, dateString) => {
                setDate(dateString);
                console.log(dateString);
              }}
              format="MM/DD/YYYY"
              style={{ borderRadius: 5, display: "flex", width: "12vw" }}
            ></DatePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Record Expense
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default DataInputForm;
