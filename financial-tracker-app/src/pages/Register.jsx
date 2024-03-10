import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Register = ({ handleRegister }) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    handleRegister(values);
    navigate("/dashboard");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="John Smith" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
            len: 10,
          },
        ]}
      >
        <Input placeholder="1234567890" autoComplete="off" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
            type: "email",
          },
        ]}
      >
        <Input placeholder="jsmith@gmail.com" />
      </Form.Item>

      <Form.Item
        label="Business"
        name="business"
        rules={[
          {
            required: true,
            message: "Please input the nature of your business!",
          },
        ]}
      >
        <Input placeholder="Lumber" autoComplete="off" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Register;
