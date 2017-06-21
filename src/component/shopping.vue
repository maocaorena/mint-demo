<template>
	<div class="alertshopping alertBottom">
		<div class="shop">
			<h3 class="shop-tip ellipsis" @click="hide()" >
				<span>夺宝有风险，参与需谨慎</span>
				<i class="iconfont icon-cha"></i>
			</h3>
			<p class="shop-tit">选择参与人次</p>
			<div class="shop-select flex">
				<button @click="reduce">-</button>
				<input type="number" class="shop-num" @input="changeBuynum(buyNum)" v-model="buyNum" />
				<button @click="add">+</button>
			</div>
			<div class="shop-fastclick-list flex flex-hlr">
				<button class="shop-fastclick-item" v-for="item of fastList" @click="changeBuynum(item)">
					{{item}}
				</button>
			</div>
			<div class="shop-bottom">
				<p>
					{{price}}元/人次，共<span>{{money}}</span>元
				</p>
				<buy-button @click.native="goPay">立即参与</buy-button>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.alertshopping{
		.shop{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #fff;
			color: #333;
			text-align: center;
		}
		.shop-tip{
			width: 100%;
			height: 40px;
			line-height: 40px;
    		background: #f7f7f7;
    		text-align: left;
    		span{
    			margin-left: 15px;
			    font-size: 14px;
			    color: #bfbfbf;
			    font-weight: 400;
    		}
    		i{
    			float: right;
			    margin-right: 10px;
			    font-size: 16px;
			    color: #666;
    		}
		}
		.shop-tit{
			width: 100%;
			height: 40px;
			line-height: 40px;
		    font-size: 15px;
		    color: #333;
		}
		.shop-select{
			margin: 0 auto;
			width: 270px;
			height: 36px;
			border: 1px solid #999;
			border-radius: 4px;
			overflow: hidden;
    		.shop-num{
    			width: 196px;
    			height: 34px;
    			border: 0;
    			border-left: 1px solid #ccc;
    			border-right: 1px solid #ccc;
    			outline: none;
    			text-align: center;
    		}
    		button{
    			display: block;
    			height: 34px;
			    width: 36px;
			    vertical-align: middle;
			    line-height: 30px;
			    font-size: 20px;
			    background: #fff;
    		}
		}
		.shop-fastclick-list{
			margin: 22px auto 16px;
			width: 270px;
			height: 32px;
		}
		.shop-fastclick-item{
			display: block;
			width: 53px;
			height: 30px;
			border: 1px solid #999;
			background: #fff;
			border-radius: 4px;
		}
		.shop-bottom{
			width: 100%;
			height: 84px;
			p{
				line-height: 40px;
			    font-size: 14px;
			    text-align: center;
			    color: #999;
			    border-top: 1px solid #ccc;
			}
		}
	}
</style>
<script type="text/javascript">
	import buybutton from '../components/buybutton.vue';//引入按钮
	import { Util } from '../assets/js/util.js'; //引入Util
	import { User } from '../assets/js/user.js'; //引入User
	
	export default {
		data () {
			return {
				buyNum : 1,
				money : 0,
				price: 1,
				fastList: [],
				userInfo: {}
			}
		},
		computed: {
		    shopping () {
		      	return this.$store.state.shopping
		    },
		},
		components:{
			"buy-button" : buybutton
		},
		methods:{
			hide(){//关闭购买弹窗
				this.$store.commit('hideShopping');
			},
			reduce(){//减少数量
				let num = this.buyNum;
				num--;
				this.changeBuynum(num);
			},
			add(){//增加数量
				let num = this.buyNum;
				num++;
				this.changeBuynum(num);
			},
			changeBuynum(num){//改变数量，计算总价
				let _num = null;
				if(num == '包尾'){
					_num = 1000000000;
				}else{
					_num = num;
				};
				if(_num > this.shopping.dbSurplusCount){
					this.buyNum =this.shopping.dbSurplusCount;
					if(_num !== 1000000000){
						Util.myAlert("亲，没有那么多了");
					};
				}else if(_num < 0 && _num != ''){
					this.buyNum = 1;
				}else if( _num == ''){
					this.buyNum = _num;
				}else{
					this.buyNum = Math.ceil(_num);
				};
				this.money = this.price * this.buyNum;
			},
			countPrice(type){//不同商品类型获取单价
				let singlePrice =1;
				switch(type){
		            case '2':
		                singlePrice = 1;
		                break;
		            case '3':
		                singlePrice = 10;
		                break;
		            case '5':
		                singlePrice = 5;
		                break;
		            case '6':
		                singlePrice = 100;
		                break;
		            default:
		                break;
		        };
		        return singlePrice;
			},
			goPay(){
				console.log(this.money);
				this.hide();
				this.$router.push(
					{
						path:"/tab/home/payOrder",
						query:{
							"periodsId": this.shopping.periodsId,
							"count": this.buyNum
						}
					}
				)
			},
			init(){//初始化显示内容
				switch(this.shopping.productType){
		            case '2'://一元夺宝
		                this.fastList=[15,50,100,'包尾'];
		                this.buyNum = 20;
		                break;
		            case '3'://十元夺宝
		            	this.fastList=[10,15,20,'包尾'];
		            	this.buyNum = 3;
		                break;
		            case '5'://五元夺宝
		            	this.fastList=[10,15,20,'包尾'];
		            	this.buyNum = 5;
		                break;
		            case '6'://百元夺宝
		            	this.fastList=[10,15,20,'包尾'];
		            	this.buyNum = 1;
		                break;
		            default:
		                break;
		        };
		        let goodsType = this.shopping.productType;
		        this.price = this.countPrice(goodsType);
		        this.changeBuynum(this.buyNum);
			}
		},
		created(){
			this.init();
		},
		mounted(){

		}
	}
</script>
