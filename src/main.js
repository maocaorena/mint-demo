import Vue from 'vue';

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import API from './api/API.js';
import VueResource from 'vue-resource';
import router from './router/router.js';
import './assets/css/common.css';//初始化样式
import './assets/css/flex.css';//flex兼容样式
import './assets/css/like.css';//公共样式


Vue.use(MintUI);
Vue.use(VueResource);

import store from './store/';

const api = new API();
Vue.prototype.api = api;

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
	router,
	API,
	store
}).$mount('#app')
