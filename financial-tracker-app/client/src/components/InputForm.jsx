import { useState } from "react";
import { Button, Form, Input } from "antd";

const InventoryInputForm = ({ currentView, businessId, addItemFunction }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);

  return (
    <>
      {currentView === "Inventory" ? (
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
              itemName,
              cost,
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
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              style={{ borderRadius: 5 }}
            />
          </Form.Item>
          <Form.Item label="Cost per Unit">
            <Input
              type="number"
              placeholder="Cost per Unit"
              allowClear
              value={cost}
              onChange={(e) => setCost(parseInt(e.target.value, 10))}
              style={{ borderRadius: 5 }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Record Inventory
            </Button>
          </Form.Item>
        </Form>
      ) : currentView === "Sales" ? (
        <p>Sales</p>
      ) : (
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
              quantity,
              cost,
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
              onChange={(e) => setCost(parseInt(e.target.value, 10))}
              style={{ borderRadius: 5 }}
            />
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

export default InventoryInputForm;
