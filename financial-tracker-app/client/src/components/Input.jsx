import { Button, Input, Form, Typography } from "antd";
const InputForm = ({ title }) => {
  return (
    <>
      <Typography.Title level={2} className="section-header">
        {" "}
        {title}
      </Typography.Title>
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
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
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
    </>
  );
};

export default InputForm;
