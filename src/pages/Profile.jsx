import React, { useEffect, useState } from "react";
import "./less/Profile.less";
import { Button, Form, Input, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { GetUserApi, ChangeUserApi } from "../requests/api";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
// 限制所上传图片
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 / 1024 < 200;
  if (!isLt2M) {
    message.error("Image must smaller than 200KB!");
  }
  return isJpgOrPng && isLt2M;
};

function Profile(props) {
  //const [password, setPassword] = useState("");
  //const [username, setUsername] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const onFinish = (values) => {
    console.log("Success:", values);
    // values为input里的username和password
    if (
      values.username &&
      values.username !== sessionStorage.getItem("username") &&
      values.password.trim() !== ""
    ) {
      console.log(values);
      ChangeUserApi({
        username: values.username,
        password: values.password,
      }).then((res) => {
        console.log(res);
        if (res.errCode === 1) {
          message.error(res.message);
        } else {
          // 需要重新登录
          message.success("修改成功！请重新登录");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      });
    }
  };

  useEffect(() => {
    GetUserApi().then((res) => {
      console.log(res);
      if (res.errCode === 0) {
        message.success("查询信息成功！");
        let { password, username } = res.data;
        // 但是set操作是异步的，无法在initialValues展示，所以采用setFields
        //setAvatar(avatar);
        //setUsername(username);
        //setPassword(password);
        setFields([{ name: ["username"], value: username }]);
        setFields([{ name: ["password"], value: password }]);
        // 将得到的用户名存起来方便对比改变与否
        sessionStorage.setItem("username", username);
      }
    });
  }, []);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        // 存储图片名称,不知道在哪里就多console.log
        // 之后设置header组件更新头像(直接在useEffect里监听localStorage的改变)
        localStorage.setItem("avatar", info.file.response.data.filePath);
        // 通过react-redux通知header更新
        props.addKey();
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="profile">
      <Form
        name="basic"
        style={{ width: "400px" }}
        fields={fields}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 22,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="修改用户名" name="username">
          <Input placeholder="请输入新用户名" />
        </Form.Item>

        <Form.Item label="修 改 密 码" name="password">
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ float: "right" }}>
          提交
        </Button>
      </Form>
      <p style={{ marginTop: "90px" }}>点击下方修改头像：</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{ "cms-token": localStorage.getItem("cms-token") }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addKey() {
      const action = { type: "addKeyFn" };
      return dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(Profile);
