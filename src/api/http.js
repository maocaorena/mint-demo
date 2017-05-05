/**
 * Created by damao on 17/5/2.
 * http配置
 */

import axios from 'axios';
import Qs from 'qs';

// axios 配置
axios.defaults.timeout = 10000;//设置超时时间

//axios.defaults.baseURL = 'http://1.migree.com.cn/duobao/';
//axios.defaults.baseURL = 'http://duobao.bianxianmao.com/duobao/';
axios.defaults.baseURL = 'http://118.178.131.193:8098/duobao/';

axios.defaults.transformResponse = function(data){
	// 这里提前处理返回的数据
	let dataType = typeof(data);
	if( dataType == "string"){
		data = JSON.parse(data);
		return data;
	}else{
		return data;
	};
};

axios.defaults.transformRequest = function(data){
	// 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，
	// 这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
	return data;
};

axios.defaults.paramsSerializer = function(params) {
	//console.log("paramsSerializer",params);
    return Qs.stringify(params)
};

//设置请求头
axios.defaults.headers = {
	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	"Accept": "application/json; charset=utf-8",
};

//返回数据类型
axios.defaults.responseType = 'json';

/*	
 * `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
 * 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve;
 * 否则，promise 将被 rejecte
*/
axios.defaults.validateStatus = function (status) {
	return status >= 200 && status < 300; // default
};

//防止浏览器缓存
let param = {};
let randomNum1 = parseInt(Math.random() * 10);
let randomNum2 = parseInt(Math.random() * 1000) + '' + new Date().getTime();
param['noCache' + randomNum1] = randomNum2;
axios.defaults.params = param;

// http request 拦截器
/*axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
*/
// http response 拦截器
/*axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });*/

export default axios;
