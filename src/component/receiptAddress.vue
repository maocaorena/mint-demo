<template>
	<div id="receiptAddress" class="wrapper">
		<div class="content">
			<div class="addItem" v-for="item of list">
				<h5 class="addItem-tit flex ellipsis">
					<span>{{item.consignee}}</span>&nbsp;&nbsp;<span>{{item.mobile}}</span>
				</h5>
				<p class="addItem-addMessage">{{item.province}}{{item.city}}{{item.address}}</p>
				<div class="addItem-addmode flex flex-hlr flex-sc">
					<a href="javascript:;" @click="addrMode(item)"><i class="iconfont icon-bianji"></i>编辑</a>
					<a href="javascript:;"><i class="iconfont icon-delete"></i>删除</a>
				</div>
			</div>
		</div>
		<button class="addAddr" @click="addrAdd()">+新增地址</button>
	</div>
</template>

<script type="text/javascript">
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入Util
	
	export default{
		data(){
			return{
				list: []
			}
		},
		methods:{
			getAddList(){
				let that = this;
				this.api.getDeliveryAddressList(User.getToken(),function(data){
					let res = data.data;
					if(res.successed){
						that.list = res.returnValue;
					}else{
						Util.myAlert("请求失败，请稍后重试")
					}
				})
			},
			addrMode(item){
				this.$store.commit("pushAddrMode",item)
				this.$router.push("/tab/account/receiptAddress/mode");
			},
			addrAdd(){
				this.$router.push({
					path: "/tab/account/receiptAddress/add"
				})
			}
		},
		created(){
			this.getAddList()
		}
	}
</script>

<style lang="scss">
	#receiptAddress{
		.content{
			top: 0;
			bottom: 43px;
		}
		.addAddr{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 43px;
			background: #f8f8f8;
			text-align: center;
    		color: #f93069;
    		font-size: 17px;
		}
		.addItem{
			width: 100%;
			border-bottom: 9px solid #f2f2f2;
		}
		.addItem-tit{
			padding: 16px 16px 0;
			margin-bottom: 4px;
			width: 100%;
			color: #666;
    		font-size: 16px;
    		font-weight: 500;
    		font-family: "-apple-system","Helvetica Neue",Roboto,"Segoe UI",sans-serif;
		}
		.addItem-addMessage{
			margin-bottom: 18px;
			padding: 0 16px;
			font-size: 13px;
			color: #666;
		}
		.addItem-addmode{
			padding: 0 16px;
			width: 100%;
			height: 35px;
			border-top: 1px solid #f2f2f2;
			a{
				color: #f93069;
				font-size: 14px;
			}
		}
	}
</style>