// 入口文件
import ReactDOM from 'react-dom';
import "./assets/base.css";
import Router from './router'
import store from './store'
import {Provider} from 'react-redux'

ReactDOM.render(
    <Provider store = {store}>
        <Router />
    </Provider>,
    document.getElementById('root')
)