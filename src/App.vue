<template>
	<div>
		<router-view></router-view>
		<div class="none">{{loginState}}</div>
	</div>
</template>
<script>
	import { Storage } from './assets/js/storage.js'; //引入Storage
	import { User } from './assets/js/user.js'; //引入User
	import { Util } from './assets/js/util.js'; //引入Util
	/*import Bus from './bus/bus.js';*/
	
	export default {
		data() {
			return {
				search: this.$route.query
			}
		},
		computed: {
		    loginState(){
		    	console.log(11111);
		    	if(this.$store.state.loginState == 2){
					console.log("登陆成功了！！");
		    	}
		    	return this.$store.state.loginState
		    }
		},
		methods: {
			//保存 appEntrance 信息
			saveAppEntrance(search) {
				if(search.appEntrance) {
					Storage.setItem(Storage.appEntrance, search.appEntrance);
					console.log("保存AppEntrance成功，AppEntrance>>", search.appEntrance);
				} else {
					Storage.removeItem(Storage.appEntrance);
					console.log('没有传入appEntrance');
				};
			},
			//保存 appHomeUrl
			saveAppHomeUrl(search) {
				if(search.appHomeUrl) {
					Storage.setItem(Storage.appHomeUrl, search.appHomeUrl);
					console.log("保存AppHomeUrl成功，AppHomeUrl>>", search.appHomeUrl);
				} else {
					Storage.removeItem(Storage.appHomeUrl);
					console.log('没有传入appHomeUrl');
				};
			},
			saveReLoginUrl(search) {
				if(search.redirectLoginUrl) {
					Storage.setItem('redirectLoginUrl', search.redirectLoginUrl);
					console.log("保存redirectLoginUrl成功，redirectLoginUrl>>", search.redirectLoginUrl);
				} else {
					Storage.removeItem('redirectLoginUrl');
					console.log('没有传入redirectLoginUrl');
				};
			},
			//保存从微信来的信息
			saveWxInfo(search) {
				if(search.appKey && search.appKey != User.getAppKey()) {
					Storage.removeItem(Storage.memberInfo);
				};
				if(Storage.getItem('QQAppInfo')) {
					Storage.removeItem('QQAppInfo');
					Storage.setItem(Storage.wxAppInfo, search);
				} else {
					Storage.setItem(Storage.wxAppInfo, search);
				};
			},
			//保存从QQ来的信息
			saveQQInfo(search) {
				if(search.appKey && search.appKey != User.getAppKey()) {
					Storage.removeItem(Storage.memberInfo);
				};
				if(Storage.getItem('wxAppInfo')) {
					Storage.removeItem('wxAppInfo');
					Storage.setItem(Storage.QQAppInfo, search);
				} else {
					Storage.setItem(Storage.QQAppInfo, search);
				};
			},
			//微信登录回调处理
			weixinLogin(search){
				let code = search.code;
				let wxAppInfo = Storage.getItem(Storage.wxAppInfo);
				let appKey = wxAppInfo.appKey;
				if(code){
					var reqData = {
						code:code,
						/*appKey:'oWc0jGVZn9Aqo5uXN4duvwbQqHQ1Gamk'*/
						appKey: appKey
					};
					this.api.wxLogin(appKey,code,function(data){
						let res = data.data;
						if(res.successed){
							//保存用户token和用户id
							Storage.setItem(Storage.memberInfo,res.returnValue);
							Util.myAlert('登录成功');
						}else{
							/*Util.toast('登录失败，请重试');*/
						};
					})
				};
			},
			//QQ登录回调处理
			qqLogin(search){
				let code = search.code;
				let wxAppInfo = Storage.getItem(Storage.wxAppInfo);
				let appKey = wxAppInfo.appKey;
				if(code){
					var reqData = {
						code:code,
						appKey: appKey
					};
					this.api.qqLogin(appKey,code,function(data){
						let res = data.data;
						if(res.successed){
							//保存用户token和用户id
							Storage.setItem(Storage.memberInfo,res.returnValue);
							Util.myAlert('登录成功');
						}else{
							/*Util.toast('登录失败，请重试');*/
						};
					})
				};
			}
		},
		created() {
			var search = this.$route.query;
			if(search.appUid) {
				//免登录链接过来

			} else if(search.code && search.state) {
				//第三方登录授权之后的回调
				switch(search.state) {
					case 'weixin':
						this.weixinLogin();
						console.log("微信登录回调");
						break;
					case 'qq':
						this.qqLogin();
						console.log("qq登录回调");
						break;
					default:
						console.log("不是qq和weixin登录回调");
						break;
				};
			}else{
				switch(this.search.appType) {
					case 'h5':
						console.log("h5接入")
						this.saveQQInfo(search);
						break;
					case 'app':
						console.log("app接入")
						this.saveQQInfo(search);
						break;
					case 'weixin':
						console.log("weixin接入")
						this.saveWxInfo(search);
						break;
					default:
						console.log("什么都没带")
						break;
				};
			};
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">

</style>