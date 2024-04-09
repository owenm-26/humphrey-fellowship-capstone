import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, theme } from "antd";
import logo from "../assets/logo.png";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";

const PORT = import.meta.env.VITE_PORT;

// eslint-disable-next-line react/prop-types
const Login = ({ handleLogin, setUserInfo }) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    // console.log("Received values of form: ", values); //uncomment for debugging user inputs
    navigate("/dashboard");

    loginUser(values);
  };

  const loginUser = async (userData) => {
    try {
      const response = await fetch(`http://localhost:${PORT}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status == 200) {
          const redirectURL = data.redirectURL;

          const token = data.jwt;

          localStorage.setItem("token", token); //put JWT in local storage
          window.location.href = redirectURL;
          handleLogin;
          // console.log(data.user);
          // alert(data.user); //uncomment to see data
          setUserInfo(data.user);
        } else {
          alert(data.message); // Show error message
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
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
          padding: "20px 48px",
          borderRadius: borderRadiusLG,
          margin: "200px 350px",
          width: "50%",
        }}
      >
        <img className="logo" src={logo} alt="logo" />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              className="form-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="form-input"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <p>
              Or <a href="/register">register now!</a>
            </p>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
export default Login;
