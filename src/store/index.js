import reducer from "./reducer";
import { legacy_createStore as createStore } from "redux";
// 或者用configureStore

const store = createStore(reducer);
export default store;
