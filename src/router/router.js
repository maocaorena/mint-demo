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
import two from '../component/two.vue'//双人夺宝
import historyRecords from '../component/historyRecords.vue'//本期夺宝记录
import announced from '../component/announced.vue'//本期夺宝记录

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: App,
	children: [
		{
            path: '',
            redirect: '/tab/home'
        },{
			path: '/tab/home',//首页
			component: home
		},{
			path: '/tab/latestAnnounced',//最新揭晓
			component: latestAnnounced
		},{
			path: '/tab/find',//发现页
			meta: {
	            requireAuth: true,
	        },
			component: find
		},{
			path: '/tab/me',//我的
			component: me
		},{
			path: '/tab/home/productDetail',//商品详情
			component: productDetail
		},{
			path: '/tab/home/imageTextMessage',//图文详情
			component: imageTextMessage
		},{
			path: '/tab/home/single',//晒单
			component: single
		},{
			path: '/tab/home/category',//分类
			component: category
		},{
			path: '/tab/home/two',//双人夺宝
			component: two
		},{
			path: '/tab/home/historyRecords',//本期夺宝记录
			component: historyRecords
		},{
			path: '/tab/home/productDetail/announced',//往期揭晓
			component: announced
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
