<template>
	<div class="alertLogin alertBottom">
		<div class="login">
			<div class="login-tit" @click="closelogin()">
				<i class="iconfont icon-cha"></i>
			</div>
			<div class="alertLogin-tit">
		    	<p>账号登录</p>
		    </div>
			<div class="flex">
		    	<div class="col">
		        	<a @click="goPhoneLogin">
		        		<img ui-sref="tab.login" width="48px" src="../assets/img/account/phone.png">
		        		<p class='p1'>手机账号</p>
		        	</a>
		        </div>
		        <div class="col">
		        	<a>
		        		<img ui-sref="tab.login" width="48px" src="../assets/img/account/weixin.png">
		        		<p class='p1'>微信</p>
		        	</a>
		        </div>
		        <div class="col">
		        	<a>
		        		<img ui-sref="tab.login" width="48px" src="../assets/img/account/qq.png">
		        		<p class='p1'>QQ</p>
		        	</a>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		methods:{
			closelogin(){
				this.$store.commit('changeAlertLogin', false);
			},
			goPhoneLogin(){
				this.closelogin();
				this.$router.push("/tab/account/login_account");
			}
		}
	}
</script>

<style lang="scss">
	.alertLogin{
		.login{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 210px;
			background: #fff;
			color: #333;
			text-align: center;
		}
		.login-tit{
			width: 100%;
			height: 48px;
			line-height: 48px;
		    font-size: 12px;
		    color: #999;
		    i{
		    	position: absolute;
		    	right: 15px;
		    	top: 0;
		    }
		}
		.alertLogin-tit{
		    position: relative;
		    margin: 0 50px 30px;
		    border-top: 1px solid #999;
		    p{
		    	width: 95px;
			    margin: -10px auto 0;
			    background-color: #fff;
			    color: #999;
			    font-size: 13px;
		    }
		}
		.p1{
			font-size: 12px;
    		color: #999;			
		}
	}
	
</style>