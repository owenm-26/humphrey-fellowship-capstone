import { Button, Form, Input, theme } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Content } from "antd/es/layout/layout";

const PORT = import.meta.env.VITE_PORT;

const Register = (/*{handleRegister}*/) => {
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    console.log(userData);
    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

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
    registerUser(values);
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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: borderRadiusLG,
        }}
      >
        <img className="logo" src={logo} alt="logo" />
        <Form
          name="basic"
          className="login-form"
          labelCol={{
            span: 6,
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
            <Input placeholder="John Smith" className="form-input" />
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
            <Input.Password className="form-input" />
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
            <Input
              placeholder="1234567890"
              autoComplete="off"
              className="form-input"
            />
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
            <Input placeholder="jsmith@gmail.com" className="form-input" />
          </Form.Item>

          <Form.Item
            label="Business"
            name="business"
            rules={[
              {
                required: false,
                message: "Please input the nature of your business!",
              },
            ]}
          >
            <Input
              placeholder="Lumber"
              autoComplete="off"
              className="form-input"
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" style={{}}>
              Submit
            </Button>
            <p style={{}}>
              Already have an account? <a href="/">Login!</a>
            </p>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
export default Register;
