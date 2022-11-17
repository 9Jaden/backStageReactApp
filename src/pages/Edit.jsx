import { Button, PageHeader, Modal, Form, Input, message } from "antd";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import {
  AddArticleApi,
  SearchArticleApi,
  UpdateArticleApi,
} from "../requests/api";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import "@wangeditor/editor/dist/css/style.css";

export default function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // 对话框
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 获取表单
  const [form] = Form.useForm();
  // editor 实例
  const [editor, setEditor] = useState(null);
  // 编辑器内容
  const [html, setHtml] = useState("");
  // 标题内容
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  // 工具栏配置
  const toolbarConfig = {};
  // 编辑器配置
  const editorConfig = {
    placeholder: "请输入内容...",
  };

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    if (params.id) {
      SearchArticleApi({ id: params.id }).then((res) => {
        if (res.errCode === 0) {
          let { title, subTitle, content } = res.data;
          setHtml(content);
          setTitle(title);
          setSubTitle(subTitle);
        }
      });
    } else {
      setHtml("<p>hello world</p>");
    }
  }, [location.pathname]); // 加了location.pathname使得路径变化则重新mount一下，可以解决编辑文章时又点击了sider里的编辑文章，内容却还保留着（实则应该清空初始化）

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  // 点击提交按钮后的处理
  const submit = (res) => {
    if (res.errCode == 0) {
      // 修改成功跳转回list页面
      message.success("提交成功！");
      setTimeout(() => {
        navigate("/list");
      }, 1000);
    } else {
      message.error(res.message);
    }
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        console.log("Received values of form: ", values);
        let { title, subTitle } = values;
        // 通过地址栏有无id判断是新文章还是编辑后重新提交文章
        if (params.id) {
          // 更新文章的请求
          UpdateArticleApi({
            content: html,
            id: params.id,
            subTitle,
            title,
          }).then((res) => {
            console.log(res);
            submit(res);
          });
        } else {
          // 添加文章的请求
          AddArticleApi({ title, subTitle, content: html }).then((res) => {
            submit(res);
          });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div  style={{ height: "100%" ,overflowY:"scroll"}}>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
        extra={
          <Button key="1" type="primary" onClick={() => setIsModalOpen(true)}>
            提交文章
          </Button>
        }
      >
        <Modal
          title="填写文章标题"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
          okText="提交"
          cancelText="取消"
        >
          <Form
            form={form}
            name="basic"
            initialValues={{ title, subTitle }}
            labelCol={{
              span: 3,
            }}
            wrapperCol={{
              span: 21,
            }}
            autoComplete="on"
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: "请输入文章标题",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="副标题" name="subTitle">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </PageHeader>
      <div
        style={{
          border: "1px solid #ccc",
          zIndex: 100,
          padding: "20px 20px",
          background: "#e6e5e1",
        }}
      >
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "50vh", overflowY: "hidden" }}
        />
      </div>
    </div>
  );
}
