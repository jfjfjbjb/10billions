import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import Routes from './router';

// import App from './components/app';
import './app.css';
import './index.scss';
import './demo';

// 处理首屏loading
// 100ms后开启，10s后关闭
let preLoader = document.querySelector('#pre-loader');
if(preLoader) {
    setTimeout(() => {
        preLoader.style.display = 'block';
    }, 100);
    setTimeout(() => {
        preLoader.style.display = 'none';
    }, 10000);
}

render(
    <Router routes={Routes} history={browserHistory}/>, document.querySelector('#app')
);

