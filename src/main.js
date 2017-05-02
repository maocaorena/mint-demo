import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './App.vue';
import Vuex from 'vuex';
import axios from './api/http.js';
import VueResource from 'vue-resource';

Vue.use(MintUI);
Vue.use(Vuex);
Vue.use(VueResource);

import router from './router/router.js';

Vue.prototype.axios = axios;


// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
	router,
	axios,
	render: h => h(App)
}).$mount('#app')