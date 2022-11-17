import React, { useState, useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

export default function Bread() {
  const [breadName, setBreadName] = useState("");
  const { pathname } = useLocation();

  // 路径一旦变化则获取对应路径名称并且修改breadName
  // 监听路由路径
  useEffect(() => {
    switch (pathname) {
      case "/list":
        setBreadName("查看文章列表");
        break;
      case "/edit":
        setBreadName("文章编辑");
        break;
      case "/profile":
        setBreadName("修改资料");
        break;
      default:
        setBreadName(pathname.includes("edit") ? "文章编辑" : "");
        break;
    }
  }, [pathname]);

  return (
    <Breadcrumb
      style={{ height: "30px", lineHeight: "30px", color: "#e6e5e1" }}
    >
      <Breadcrumb.Item>
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item href={pathname} style={{ color: "#e6e5e1" }}>
        {breadName}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
