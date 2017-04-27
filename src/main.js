import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource)

import routes from './router/router.js'
import first from './component/first.vue'
import secondcomponent from './component/second.vue'
import find from './component/find.vue'
import me from './component/me.vue'
import tab from './component/tab.vue'
import detail from './component/detail.vue'
// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
	routes
});

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
	router: router,
	render: h => h(App)
}).$mount('#app')