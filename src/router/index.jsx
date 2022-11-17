/* 
层级：
 App > List + Edit + Profile
 Login
 Register

 History模式 -- BrowserRouter
 Hash模式   -- HashRouter
*/

import App from "../App";
import Article from "../pages/Article";
import Edit from "../pages/Edit";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const BaseRouter = () => (
  // 注意用的是圆括号，因为要写标签
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/list" element={<Article />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  </Router>
);

export default BaseRouter;
