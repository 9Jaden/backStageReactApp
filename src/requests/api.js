import request from "./request";

// 注册接口
export const RegisterApi = (params) => request.post("/register", params);

// 登录接口
export const LoginApi = (params) => request.post("/login", params);

// 获取文章列表,get请求需要解构参数，{params}
export const ArticleApi = (params) => request.get("/article", { params });

// 添加文章
export const AddArticleApi = (params) => request.post("/article/add", params);

// 查看文章
export const SearchArticleApi = (params) =>
  request.get(`/article/${params.id}`);

// 编辑后重新提交文章
export const UpdateArticleApi = (params) =>
  request.put("/article/update", params);

// 删除文章
export const DeleteArticleApi = (params) =>
  request.post("/article/remove", params);

// 获取用户资料
export const GetUserApi = () => request.get("/info");

// 修改用户资料
export const ChangeUserApi = (params) => request.put("/info", params);
