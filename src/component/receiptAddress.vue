<template>
	<div id="receiptAddress" class="wrapper">
		<div class="content">
			<div class="selectItem" v-for="item of list" v-if="orderId" @click="selectThis(item)">
				<h5 class="addItem-tit flex ellipsis">
					<span>{{item.consignee}}</span>&nbsp;&nbsp;<span>{{item.mobile}}</span>
				</h5>
				<p class="addItem-addMessage">{{item.province}}{{item.city}}{{item.address}}</p>
				<i class="iconfont icon-jiantou"></i>
			</div>
			<div class="addItem" v-for="(item, index) of list" v-if="orderId == ''">
				<h5 class="addItem-tit flex ellipsis">
					<span>{{item.consignee}}</span>&nbsp;&nbsp;<span>{{item.mobile}}</span>
				</h5>
				<p class="addItem-addMessage">{{item.province}}{{item.city}}{{item.address}}</p>
				<div class="addItem-addmode flex flex-hlr flex-sc">
					<a href="javascript:;" @click="addrMode(item)"><i class="iconfont icon-bianji"></i>编辑</a>
					<a href="javascript:;" @click="deleteAddr(item.id,index)"><i class="iconfont icon-delete"></i>删除</a>
				</div>
			</div>
		</div>
		<div class="selectAlert flex-zhong" v-if="selectAlert">
			<div class="selectAlert-in">
				<div class="selectAlert-tit flex flex-hlr"><span>确认收货地址</span><i class="iconfont icon-cha" @click="hide"></i></div>
				<p class="selectAlert-name">{{selectAddr.consignee}} {{selectAddr.mobile}}</p>
				<p class="selectAlert-addr">{{selectAddr.province}} {{selectAddr.city}} {{selectAddr.region}} {{selectAddr.address}}</p>
				<div class="selectAlert-buttons flex flex-hlr">
					<button @click="hide">取消</button>
					<button @click="isThis">确认</button>
				</div>
			</div>
		</div>
		<button class="addAddr" @click="addrAdd()">+新增地址</button>
	</div>
</template>

<script type="text/javascript">
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入Util
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	
	export default{
		data(){
			return{
				list: [],
				orderId: this.$route.query.orderId || '',
				selectAlert: false,
				selectAddr:{}
			}
		},
		methods:{
			hide(){
				this.selectAlert = false;
			},
			isThis(){
				let that = this;
				Indicator.open();
				this.api.selectAddress(this.orderId,this.selectAddr.id,function(data){
					Indicator.close();
					let res = data.data;
					if(res.successed){
						console.log("chenggong")
						that.$router.replace("/tab/account/winningRecords/0")
					}
				})
			},
			selectThis(item){
				this.selectAddr = item;
				this.selectAlert = true;
			},
			deleteAddr(id,index){
				console.log(id,index);
				let that = this;
				Indicator.open();
				this.api.deleteAddress(User.getToken(),id,function(data){
					Indicator.close();
					let res = data.data;
					if(res.successed){
						Util.myAlert('删除成功！')
						that.list.splice(index,1);
					}else{
						Util.myAlert('删除失败，请稍后重试')
					};
				})
			},
			getAddList(){
				let that = this;
				Indicator.open();
				this.api.getDeliveryAddressList(User.getToken(),function(data){
					Indicator.close();
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
			this.getAddList();
			console.log(typeof(this.$route.query.orderId))
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
		.selectItem{
			position: relative;
			width: 100%;
			border-bottom: 1px solid #f2f2f2;
			.iconfont{
				height: 100%;
				position: absolute;
				right: 18px;
				top: 0;
				font-size: 18px;
				line-height: 77px;
			}
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
		.selectAlert{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5)
		}
		.selectAlert-in{
			padding: 16px;
			width: 75%;
		    background: #fff;
		    border-radius: 5px;
		}
		.selectAlert-tit{
			padding-bottom: 22px;
			width: 100%;
			color: #b7b7b7;
			font-size: 12px;
			i{
				font-size: 12px;
			}
		}
		.selectAlert-name{
		    width: 100%;
		    font-size: 16px;
		    color: #666;
		    margin-bottom: 10px;
		}
		.selectAlert-addr{
			width: 100%;
		    font-size: 13px;
		    color: #666;
		    margin-bottom: 22px;
		}
		.selectAlert-buttons{
			width: 100%;
			button{
				width: 48%;
				height: 32px;
				border-radius: 5px;
				color: #fff;
			}
			button:nth-child(1){
				background: #ccc;
			}
			button:nth-child(2){
				background: #f93069;
			}
		}
	}
</style>