import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

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
import login_account from '../component/login.vue'//登录页
import register from '../component/register.vue'//注册页
import payOrder from '../component/payOrder.vue'//支付页
import payResult from '../component/payResult.vue'//支付结果页
import duobaorecords from '../component/duobao-records.vue'//夺宝记录页
import winningRecords from '../component/winningRecords.vue'//中奖记录页
import receiptAddress from '../component/receiptAddress.vue'//收货地址
import receiptAddressHandle from '../component/receiptAddress-handle.vue'//收货地址编辑
import myShaiDan from '../component/myShaiDan.vue'//我的晒单
import goShaiDan from '../component/goShaiDan.vue'//去晒单

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
			component: find
		},{
			path: '/tab/me',//我的
			meta: {
	            loginState: true,
	        },
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
		},{
			path: '/tab/account/login_account',//登录页
			component: login_account
		},{
			path: '/tab/register',//注册页
			component: register
		},{
			path: '/tab/home/payOrder',//支付页
			component: payOrder
		},{
			path: '/tab/home/wechatPayResult',//支付结果页
			component: payResult
		},{
			path: '/tab/account/winningRecords/:status',//中奖记录页
			component: winningRecords
		},{
			path: '/tab/account/duobao-records/:status',//夺宝记录页
			component: duobaorecords
		},{
			path: '/tab/account/receiptAddress',//收货地址页
			component: receiptAddress
		},{
			path: '/tab/account/receiptAddress/:handle',//收货地址编辑页
			component: receiptAddressHandle
		},{
			path: '/tab/account/myShaiDan/:status',//我的晒单
			component: myShaiDan
		},{
			path: '/tab/account/goShaiDan',//去晒单
			component: goShaiDan
		}
	]
}];

const router = new VueRouter({
    routes: routes
});

router.beforeEach((to, from, next) => {
	/*console.log("to:",to);
	console.log("from:",from);
	var str = to.fullPath;
	var c = "/"; // 要计算的字符
	var regex = new RegExp(c, 'g'); // 使用g表示整个字符串都要匹配
	var result = str.match(regex);
	var tocount = !result ? 0 : result.length;
	
	var fromstr = from.fullPath;
	var fromc = "/"; // 要计算的字符
	var fromregex = new RegExp(c, 'g'); // 使用g表示整个字符串都要匹配
	var fromresult = fromstr.match(fromregex);
	var fromcount = !fromresult ? 0 : fromresult.length;
	
	if(tocount>fromcount){
		console.log("进")
		store.commit('changeRouterAnimate','fadeleft')
	}else if(tocount == fromcount){
		console.log("平级")
		store.commit('changeRouterAnimate','fade')
	}else{
		console.log("出")
		store.commit('changeRouterAnimate','faderight')
	};
*/
   	if (to.matched.some(r => r.meta.loginState)) {
   		let loginState = localStorage.getItem('memberInfo')
	    if (loginState) {
	        next();
   	    } else {
  	        next({
               	path: '/tab/account/login_account',
            	query: {}
           	})
      	};
	} else {
	    next();
  	};
});
export default router;
