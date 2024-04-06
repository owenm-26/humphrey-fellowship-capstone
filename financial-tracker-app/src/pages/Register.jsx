import React, { useState } from "react";
import { Button, Form, Input, theme } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Content } from "antd/es/layout/layout";

// FIX LATER
const PORT = 6789

const Register = ({ handleRegister }) => {
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    try {
      const response = await fetch(`http://localhost:${PORT}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

            if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message
        navigate("/"); // Redirect to login on successful registration
      } else {
        const errorData = await response.json();
        alert(errorData.error); // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    registerUser(values);
    handleRegister(values) //frontend sake
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Content
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: "0 48px",
          borderRadius: borderRadiusLG,
        }}
      >
        <img className="logo" src={logo} alt="logo" />
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
              offset: 5,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
export default Register;
