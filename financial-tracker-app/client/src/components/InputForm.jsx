import { useState } from "react";
import { Button, Form, Input } from "antd";

const InputForm = ({ businessId, addInventoryItem }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);

  return (
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
        addInventoryItem(businessId, {
          itemName,
          quantity,
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
      <Form.Item label="Total Cost">
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
          Record Inventory
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InputForm;
