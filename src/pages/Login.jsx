import React from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./less/Login.css";
import logoImg from "../assets/midnights.png";
import { LoginApi } from "../requests/api";

export default function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    LoginApi({
      username: values.username,
      password: values.password,
    }).then((res) => {
      console.log(res);
      if (res.errCode === 0) {
        message.success("登录成功!");
        // 存储数据
        localStorage.setItem("avatar", res.data.avatar);
        // 因为其key里有横杠-，所以要用data['cms-token']取
        localStorage.setItem("cms-token", res.data["cms-token"]);
        localStorage.setItem("editable", res.data.editable);
        localStorage.setItem("player", res.data.player);
        localStorage.setItem("username", res.data.username);
        // 跳转到根路径
        setTimeout(() => {
          navigate("/list");
        }, 1500);
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <div className="login">
      <div className="login_box">
        <img src={logoImg} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Link to={"/register"}>Click here to register~</Link>
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
