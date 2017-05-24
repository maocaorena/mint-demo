import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/';//引入vuex
import App from '../App.vue'
import home from '../component/home.vue'//首页
import latestAnnounced from '../component/latestAnnounced.vue'//最新揭晓
import find from '../component/find.vue'//发现页
import me from '../component/me.vue'//我的
import productDetail from '../component/productDetail.vue'//商品详情
import imageTextMessage from '../component/imageTextMessage.vue'//图文详情
import single from '../component/single.vue'//晒单
import category from '../component/category.vue'//分类
import server from '../component/server.vue'//客服弹窗

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: App,
	children: [
		{
            path: '',
            redirect: '/tab/home'
        },{
			path: '/tab/home',
			component: home
		},{
			path: '/tab/latestAnnounced',
			component: latestAnnounced
		},{
			path: '/tab/find',
			meta: {
	            requireAuth: true,
	        },
			component: find
		},{
			path: '/tab/me',
			component: me
		},{
			path: '/tab/home/productDetail',
			component: productDetail
		},{
			path: '/tab/home/imageTextMessage',
			component: imageTextMessage
		},{
			path: '/tab/home/single',
			component: single
		},{
			path: '/tab/home/category',
			component: category
		}
	]
}];

const router = new VueRouter({
    routes
});

// router.beforeEach((to, from, next) => {
// 	if(from.path == "/tab/home/productDetail" || from.path == "/tab/home"){
// 		store.commit('hideShopping', false);
// 	};
//     if (to.matched.some(r => r.meta.requireAuth)) {
//         if (store.state.token) {
//             next();
//         }else {
//             next({
//                 path: '/tab/me',
//                 query: {}
//             })
//         };
//     }else {
//         next();
//     };
// });

export default router;
