import React, { useState, useEffect } from "react";
import "./less/List.less";
import { Button, List, Skeleton, Pagination, message } from "antd";
import { ArticleApi, DeleteArticleApi } from "../requests/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Article() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // 控制页面更新的变量
  const [update, setUpdate] = useState(0);

  // 请求封装
  const getList = (num) => {
    ArticleApi({ num, count: pageSize }).then((res) => {
      console.log(res);
      if (res.errCode === 0) {
        let { arr, total, num, count } = res.data;
        setList(arr);
        console.log(res.data);
        setTotal(total);
        setCurrent(num);
        setPageSize(count);
        // 深拷贝数据然后进行处理
        // let newArr = JSON.parse(JSON.stringify(res.data.arr));
      }
    });
  };

  // 分页
  const onChange = (pages) => {
    getList(pages);
  };

  // 请求文章列表
  useEffect(() => {
    getList(current);
  }, [update]);

  // 删除文章
  const delFn = (id) => {
    DeleteArticleApi({ id }).then((res) => {
      if (res.errCode === 0) {
        message.success("删除成功!");
        console.log(res);
        // 删除成功后需要重新刷页面或者重新请求列表数据
        // 1. 刷新 window.location.reload()
        // 2. 调用getList()
        // 3. 在useEffect中增加变量(update)的检测，已使用
        setUpdate(update + 1); // +1则可以一直变，不能false和true否则一直true
      }
    });
  };

  return (
    <div className="list" style={{ padding: "20px" }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => navigate("/edit/" + item.id)}
              >
                编辑
              </Button>,
              <Button danger onClick={() => delFn(item.id)}>
                删除
              </Button>,
            ]}
          >
            <Skeleton loading={false} active>
              <List.Item.Meta
                title={<a href="!#">{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Pagination
        style={{ float: "right", marginTop: "20px" }}
        total={total}
        onChange={onChange}
        current={current}
        pageSize={pageSize}
      />
    </div>
  );
}
