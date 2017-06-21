<template>
	<div id="payresult">
		<h5 class="payresult-state flex-zhong">
			<img src="../assets/img/account/gou.png" alt="" />
			支付成功
		</h5>
		<div class="payresult-button">
			<buy-button @click.native="goHome">继续夺宝</buy-button>
			<buy-button class="gray">查看订单</buy-button>
		</div>
		<div class="payresult-orderinfo">
			<div class="payresult-top flex">
				<p class="payresult-orderinfo-name ellipsis">{{orderMessage.productName}}</p>
				<p class="payresult-orderinfo-count"><span>{{orderMessage.buyCount}}</span>人次</p>
			</div>
			<p class="payresult-orderinfo-periodsNumber">商品期号：{{orderMessage.periodsNumber}}</p>
			<div class="payresult-bottom flex">
				<p class="payresult-orderinfo-num ellipsis">夺宝号码：{{orderMessage.dbNums}}</p>
				<p class="payresult-orderinfo-allcount" @click="isShowLuckNumAlert">查看全部</p>
			</div>
		</div>
		<alertlucknum @close="isShowLuckNumAlert" v-if="showLuckNumAlert" :message="alertMessage"></alertlucknum>
	</div>
</template>

<script type="text/javascript">
	import buybutton from '../components/buybutton.vue';//引入按钮
	import alertlucknum from '../components/lucknum.vue';//引入幸运号弹窗
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入Util
	export default{
		data(){
			return{
				search: this.$route.query,
				orderMessage: {},
				alertMessage: {},
				showLuckNumAlert: false
			}
		},
		components:{
			"buy-button" : buybutton,
			"alertlucknum" : alertlucknum
		},
		methods:{
			afterPay(){
				let that = this;
				this.api.afterPayOrder(User.getToken(),this.search.orderNums,function(data){
					let res = data.data;
					that.orderMessage = res.returnValue;
					let luckNums = res.returnValue.dbNums.split(',');
					that.alertMessage = that.orderMessage;
					that.alertMessage.nums = luckNums;
					console.log(luckNums);
				})
			},
			isShowLuckNumAlert(){
				this.showLuckNumAlert = !this.showLuckNumAlert;
			},
			goHome(){
				this.$router.push("/tab/home")
			}
		},
		created(){
			this.afterPay();
			console.log(this.search)
		}
	}
</script>

<style lang="scss">
	#payresult{
		.payresult-state{
			width: 100%;
			height: 150px;
			font-size: 21px;
    		color: #55af0e;
    		font-weight: 400;
    		img{
    			width: 29px;
    			margin-right: 3px;
    		}
		}
		.payresult-button{
			margin: 0 auto 45px;
			width: 55%;
			height: 80px;
			.gray{
				background: #ccc;
				margin-top: 16px;
			}
		}
		.payresult-orderinfo{
			padding: 15px;
			width: 100%;
			border-top: 1px solid #f2f2f2;
			border-bottom: 1px solid #f2f2f2;
		}
		.payresult-top{
			width: 100%;
			font-size: 13px;
			color: #717171;
		}
		.payresult-orderinfo-name{
			width: 80%;
			font-weight: 600;
		}
		.payresult-orderinfo-count{
			width: 20%;
			text-align: right;
			span{
				color: #f43a52;
			}
		}
		.payresult-orderinfo-periodsNumber{
			margin: 8px 0;
			font-size: 12px;
			color: #a3a3a3;
		}
		.payresult-bottom{
			width: 100%;
			font-size: 12px;
			color: #a3a3a3;
		}
		.payresult-orderinfo-num{
			width: 80%;
		}
		.payresult-orderinfo-allcount{
			width: 20%;
			text-align: right;
			color: #0f8eff;
		}
	}
</style>