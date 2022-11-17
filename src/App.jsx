import React from "react";
import { Outlet } from "react-router-dom"; // 展示子路由
import { Layout } from "antd";
import Header from "./components/Header";
import Aside from "./components/Aside";
import Bread from "./components/Bread";
import { connect } from "react-redux";

function App(props) {
  return (
    <div>
      <Layout id="app">
        <Header key={props.myKey} />
        <div className="container">
          <Aside />
          <div className="container_box">
            <Bread />
            <div className="container_content">
              <Outlet />
            </div>
          </div>
        </div>
        <footer>React | Copyright &copy; 2022 Author Shawn9</footer>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    myKey: state.myKey,
  };
};

export default connect(mapStateToProps)(App);
