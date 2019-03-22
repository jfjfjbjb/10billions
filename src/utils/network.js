import axios from "axios";
import {message} from 'antd';

let baseUrl = 'http://127.0.0.1:3001/';
if(PRODUCTION) {
    baseUrl = 'http://47.102.133.38:3001/';  // 线上地址
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    var res = response.data;
    if (res.code != '0') {  // code不为0，判定为非法
        message.error(res.message);
        return Promise.reject(res);
    } else {
        return res;
    }
}, function (error) {
    return Promise.reject(error);
});

export default {
    get(options = {}) {
        return axios({...options, method: 'get', baseURL: baseUrl});
    },
    post(options = {}) {
        return axios({...options, method: 'post', baseURL: baseUrl});
    }
};
