import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './App.vue';
import API from './api/API.js';
import VueResource from 'vue-resource';

Vue.use(MintUI);
Vue.use(VueResource);

import router from './router/router.js';
import store from './store/';

const api = new API();
Vue.prototype.api = api;

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
	router,
	API,
	store,
	render: h => h(App)
}).$mount('#app')
