// 定义一个默认状态
const defaultState = {
  myKey: 1,
};

// 导出一个函数
export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "addKeyFn":
      console.log(123);
      newState.myKey++;
      break;
    default:
      break;
  }
  return newState;
};
