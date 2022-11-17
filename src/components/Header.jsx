import React, { useState } from "react";
import logoImg from "../assets/midnights.png";
import {
  DownCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, message, Modal } from "antd";
import defaultAvatar from "../assets/defaultAvatar.jpg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [username, setUsername] = useState("游客9");
  const { confirm } = Modal;

  // 模拟componentDidMount
  useEffect(() => {
    let avatar1 = localStorage.getItem("avatar");
    let username1 = localStorage.getItem("username");
    if (avatar1) {
      setAvatar("http://47.93.114.103:6688/" + avatar1);
    }
    if (username1) {
      setUsername(username1);
    }
  }, [props.myKey]);
  // 这里利用了react-redux从Profile组件上传头像后dispatch修改myKey的action
  // 之后在此Header组件里通过props拿到myKeys过后监听它的改变重新加载头像
  // 或者直接监听localStorage也是可以的

  // 退出登录
  const showConfirm = () => {
    confirm({
      title: "您确定要登出吗?",
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      cancelText: "返回",
      onOk() {
        // localStorage.clear();
        localStorage.removeItem("avatar");
        localStorage.removeItem("username");
        localStorage.removeItem("cms-token");
        localStorage.removeItem("editable");
        localStorage.removeItem("player");
        message.success("退出成功，即将返回登录页");
        setTimeout(() => navigate("./login"), 1500);
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key={1}>修改资料</Menu.Item>
      <Menu.Divider />
      <Menu.Item key={2} onClick={showConfirm}>
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <header>
      <img src={logoImg} alt="" className="logo" />
      <div className="rightMenu">
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <img src={avatar} className="avatar" alt="" />
            <span>{username}</span>
            <DownCircleOutlined />
          </a>
        </Dropdown>
      </div>
    </header>
  );
}
