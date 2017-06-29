<template>
	<div id="account" class="wrapper">
		<div class="content">
			<div class="account-top">
		    	<router-link class="account-message" to="/tab/home">
		    		<i class="iconfont icon-letter"></i>
		    		<i class="redPoint"></i>
		    	</router-link>
				<div class="account-userhead flex flex-s flex-hc flex-sc">
					<img class="user-pic" :src="userInfo.headIcon">
					<p class="userName ellipsis">{{userInfo.nike}}</p>
				</div>
		    	<div class="account-ammount flex">
				    <p>夺宝点 {{amount}}</p>
				    <button>充值</button>
			    </div>
			</div>
			<div class="account-topthree flex">
				<router-link class="account-topthree-item flex flex-s flex-hc flex-sc" to="/tab/account/duobao-records/0">
		    		<i class="iconfont icon-record"></i>
					<p>夺宝记录</p>
		    	</router-link>
				<router-link class="account-topthree-item flex flex-s flex-hc flex-sc" to="/tab/account/winningRecords/0">
		    		<i class="iconfont icon-prize"></i>
					<p>中奖记录</p>
		    	</router-link>
				<router-link class="account-topthree-item flex flex-s flex-hc flex-sc" to="/tab/home">
		    		<i class="iconfont icon-redbag"></i>
					<p>我的红包</p>
		    	</router-link>
			</div>
			<menu-bar :togo="'/tab/account/myShaiDan/0'" :icon="'icon-share'" :height="50" :title="'我的晒单'"></menu-bar>
			<menu-bar :togo="'/home'" :icon="'icon-recharge'" :height="50" :title="'充值记录'"></menu-bar>
			<menu-bar :togo="'/tab/account/receiptAddress'" :icon="'icon-ad'" :height="60" :title="'收货地址'" class="account-menubar" ></menu-bar>
			<menu-bar :togo="'/tab/account/aaaa'" :icon="'icon-setting'" :height="50" :title="'设置'"></menu-bar>
			<menu-bar :togo="'/home'" :icon="'icon-QA'" :height="50" :title="'常见问题'"></menu-bar>
		</div>
		<footer-bar></footer-bar>
	</div>
</template>
<style lang="scss">
	#account{
		.content{
            top: 0;
            bottom: 47px;
			.account-top{
				height: 180px;
				width: 100%;
				background: -moz-linear-gradient(top, #ef0e67 0%, #f25a75 100%);
				background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ef0e67), color-stop(100%,#f25a75));
				background: -webkit-linear-gradient(top, #ef0e67 0%,#f25a75 100%);
				background: -o-linear-gradient(top, #ef0e67 0%,#f25a75 100%);
				background: -ms-linear-gradient(top, #ef0e67 0%,#f25a75 100%);
				background: linear-gradient(to bottom, #ef0e67 0%,#f25a75 100%);
				.account-message{
					width: 38px;
					height: 38px;
					position: absolute;
					top:10px;
					right: 20px;
					background: #d81665;
					border-radius: 50%;
					text-align: center;
					.iconfont{
						color:#ffffff;
						line-height: 38px;
						font-size: 26px;
					}
				}
				.account-userhead{
					width: 100%;
					padding-top: 20px;
					img{
						width: 61px;
						height: 61px;
						border: 4px solid #f28eb0;
						border-radius: 50%;
					}
					.userName{
						width: 100%;
						height: 40px;
						padding: 5px 0 15px;
						font-size: 16px;
						color: #fff;
						text-align: center;
					}
				}
				.account-ammount{
					height: 25px;
					width: 170px;
					margin: 0 auto;
					line-height: 25px;
					border-radius: 12px;
					background: #d81665;
					p{
						width: 115px;
						color: #fff;
						font-size: 12px;
						text-align: center;
					}
					button{
						display: block;
						height: 19px;
						margin-top: 3px;
						font-size: 12px;
						width: 50px;
						border-radius: 10px;
						background: #ffce00;
						border: none;
						color: #aa6017;
					}
				}
			}
			.account-topthree{
				width: 100%;
				height: 92px;
				border-bottom: 10px solid #f2f2f2;
				.account-topthree-item{
					width: 33%;
					height: 100%;
					.iconfont{
						padding: 10px 0 5px;
						font-size: 35px;
						color: #f93069;
						font-weight: 600px;
					}
					p{
						width: 100%;
					    height: 34%;
					    text-align: center;
					    font-size: 12px;
					    color: #666666;
					}
				}
				a:nth-child(2){
					border-left: 1px solid #f2f2f2;
					border-right: 1px solid #f2f2f2;
				}
			}
			.account-menubar{
				border-bottom: 10px solid #f2f2f2;
			}
		}
	}
</style>
<script type="text/javascript">
	import footerbar from './tab.vue';
	import menubar from '../components/menubar.vue';//引入菜单跳转
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入User

	export default {
		name: "me",
		data () {
			return {
				userInfo : {},
				amount : 0
			}
		},
		components: {
			"footer-bar" : footerbar,
			"menu-bar" : menubar
		},
		computed: {
			
		},
		methods:{
			getMyInfo(){
				console.log(User.getToken());
				let that = this;
				this.api.getUserInfo(User.getToken(),function(data){
					let res = data.data;
					console.log(res);
					if(res.successed){
						that.userInfo = res.returnValue;
						that.api.getAmount(User.getToken(),User.getAppKey(),function(data){
							let _res = data.data;
							if(_res.successed){
								that.amount = _res.returnValue;
							}
						})
					}else{
						Util.myAlert("请登录");
						that.$router.push("/tab/account/login_account")
					}
				})
			}
		},
		created(){
			this.getMyInfo();
		}
	}
</script>
