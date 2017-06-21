<template>
	<div id="payorder" class="wrapper">
		<div class="content">
			<div class="order">
				<p class="order-num">订单号：{{orderInfo.orderNums}}</p>
				<p class="order-money">￥{{orderInfo.money}}</p>
			</div>
			<div class="order-redmoney">
				{{payType}}
			</div>
			<h5 class="pay-type-tit">
				支付方式
			</h5>
			<div class="pay-type-list">
				<div class="pay-type-item flex-zhong" v-if="showAmountPay" @click="selectPayType(0)">
					<div class="pay-type-img">
						<img src="../assets/img/Pay_Balance.png"/>
					</div>
					<p class="pay-type-name">
						余额支付 <span>（￥{{amount}}）</span>
					</p>
					<input class="my-choekbox-red" type="radio" value="0" v-model="payType" name="payType">
				</div>
				<div class="pay-type-item flex-zhong" @click="selectPayType(1)">
					<div class="pay-type-img">
						<img src="../assets/img/alipay.png"/>
					</div>
					<p class="pay-type-name">
						支付宝
					</p>
					<input class="my-choekbox-red" type="radio" value="1" v-model="payType" name="payType">
				</div>
				<div class="pay-type-item flex-zhong" @click="selectPayType(2)">
					<div class="pay-type-img">
						<img src="../assets/img/Pay_wx.png"/>
					</div>
					<p class="pay-type-name">
						微信
					</p>
					<input class="my-choekbox-red" type="radio" value="2" v-model="payType" name="payType">
				</div>
			</div>
			<div class="pay-agree flex flex-sc">
				<input class="pay-agree-choekbox" type="checkbox" v-model="payAgree">
				<router-link to="/tab/home">同意《用户协议》</router-link>
			</div>
		</div>
		<div class="pay-button">
			<buy-button v-if="payAgree" @click.native="pay">立即支付</buy-button>
			<buy-button class="gray" v-else>立即支付</buy-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import buybutton from '../components/buybutton.vue';//引入按钮
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入Util
	
	export default{
		data(){
			return{
				payType: 0,
				payAgree: true,
				search: this.$route.query,
				orderInfo: {},
				amount: 0,
				showAmountPay: false,
			}
		},
		components:{
			"buy-button" : buybutton
		},
		methods:{
			//选择支付方式
			selectPayType(type){
				console.log(type)
				this.payType = type;
			},
			pay(){
				console.log("支付方式：",this.payType)
				if(this.payType === 0){
					//余额支付
					this.balancePay();
				}
			},
			//创建订单
			createdOrder(){
				let that = this;
				this.api.creatOrder({
					periodId: this.search.periodsId,
					count: this.search.count,
					token: User.getToken()
				},function(data){
					let res = data.data;
					if(res.successed){
						that.orderInfo = res.returnValue;
						that.getAmount();
					}else{
						Util.myAlert("创建订单失败，请稍后重试")
					};
				})
			},
			//获取用户余额
			getAmount(){
				let that = this;
				this.api.getAmount(User.getToken(),User.getAppKey(),function(data){
					if(data.data.successed){
						that.amount = data.data.returnValue;
						if(that.orderInfo.money > that.amount){
							that.showAmountPay = false;
							that.payType = 1;
						}else{
							that.showAmountPay = true;
							that.payType = 0;
						};
					}
				})
			},
			//余额支付
			balancePay(){
				Indicator.open();
				let that = this;
				this.api.balancePay({
					token : User.getToken(),
					orderNums : this.orderInfo.orderNums,
					paymentId : 0
				},function(data){
					Indicator.close();
					let res = data.data;
					if(res.successed){
						that.$router.push({path:"/tab/home/wechatPayResult",query:{"orderNums": that.orderInfo.orderNums}})
					}else{
						Util.myAlert("支付失败，请稍后重试")
					}
				})
			}
		},
		created(){
			this.createdOrder();
		}
	}
</script>

<style lang="scss">
	#payorder{
		background: #f2f2f2;
		.content{
			top: 0;
			bottom: 54px;
		}
		.pay-button{
			position: absolute;
			bottom: 0;
			left: 0;
			padding-top: 11px;
			width: 100%;
			height: 54px;
			background: #fff;
			.gray{
				background: #999;
			}
		}
		.order{
			margin-bottom: 10px;
			padding: 10px 15px 0;
			width: 100%;
			height: 69px;
			background: #fff;
		}
		.order-num{
			width: 100%;
			height: 18px;
			font-size: 12px;
			color: #999;
		}
		.order-money{
			width: 100%;
			height: 26px;
		    font-size: 26px;
		    color: #f93069;
		    font-family: '微软雅黑';
		    text-align: right;
		}
		.order-redmoney{
			padding: 0 15px;
			margin-bottom: 10px;
			width: 100%;
			height: 44px;
			background: #fff;
		}
		.pay-type-tit{
			padding: 0 15px;
			margin-bottom: 1px;
			width: 100%;
			height: 44px;
			background: #fff;
			line-height: 44px;
			color: #999;
			font-weight: 400;
			font-size: 16px;
			
		}
		.pay-type-list{
			width: 100%;
		}
		.pay-type-item{
			margin-bottom: 1px;
			padding: 0 15px;
			width: 100%;
			height: 59px;
			background: #fff;
		}
		.pay-type-img{
			width: 40px;
			height: 40px;
			img{
				width: 100%;
			}
		}
		.pay-type-name{
			width: 80%;
			text-indent: 15px;
			font-size: 14px;
			color: #333;
			span{
				color: #F93069;
				font-size: 12px;
			}
		}
		.my-choekbox-red{
            position: relative;
            width: 20px;
            height: 20px;
            -webkit-appearance: none;
            outline: none;
        }
        .my-choekbox-red::before{
            content: '';
            display: block;
            width: 20px;
            height: 20px;
            border: 1px solid #ddd;
            border-radius: 50%;
            background: #fff;
        }
        .my-choekbox-red::after{
            content: '';
            position: absolute;
            top: 26%;
            left: 26%;
            display: block;
            width: 14px;
            height: 6px;
            border-left: 1px solid #fff;
            border-bottom: 1px solid #fff;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            opacity: 0;
        }
        .my-choekbox-red:checked:after{
            opacity: 1;
        }
        .my-choekbox-red:checked:before{
            background: #f53952;
            border-color: #f53952;
        }
        .pay-agree{
        	padding: 0 15px;
        	width: 100%;
        	height: 38px;
        	background: #fff;
        	line-height: 38px;
        	a{
        		color: #6fa5ee;
			    font-size: 12px;
			    margin-left: 10px;
        	}
        }
        .pay-agree-choekbox{
            position: relative;
            width: 20px;
            height: 20px;
            -webkit-appearance: none;
            outline: none;
        }
        .pay-agree-choekbox::before{
            content: '';
            display: block;
            width: 20px;
            height: 20px;
            border: 1px solid #ccc;
            border-radius: 50%;
            background: #fff;
        }
        .pay-agree-choekbox::after{
            content: '';
            position: absolute;
            top: 26%;
            left: 26%;
            display: block;
            width: 14px;
            height: 6px;
            border-left: 1px solid #6fa5ee;
            border-bottom: 1px solid #6fa5ee;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            opacity: 0;
        }
        .pay-agree-choekbox:checked:after{
            opacity: 1;
        }
	}
</style>