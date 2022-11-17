import React from "react";
import { FormOutlined, BarsOutlined, SkinOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Aside() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideKey, setSideKey] = useState("");

  // 一般加一个空数组就是为了模仿componentDidMount
  useEffect(() => {
    let path = location.pathname;
    setSideKey(path.split("/")[1]);
  }, [location.pathname]);

  const items = [
    { label: "查看文章列表", key: "list", icon: <BarsOutlined /> }, // 菜单项务必填写 key
    { label: "文章编辑", key: "edit", icon: <FormOutlined /> },
    { label: "修改资料", key: "profile", icon: <SkinOutlined /> },
  ];

  const handleClick = (e) => {
    navigate("/" + e.key);
    setSideKey(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      items={items}
      mode="inline"
      theme="dark"
      className="aside"
      selectedKeys={[sideKey]}
    />
  );
}
