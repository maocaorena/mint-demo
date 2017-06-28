<template>
	<div id="db-records" class="wrapper">
		<tabbars-v @clickThis="isThis" :names='["全部","进行中","已揭晓"]' :initTab="$route.params.status"></tabbars-v>
		<div class="content">
			<ul class="page-infinite-list dbr-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
				<li class="page-infinite-listitem dbr-item flex" v-for="(goodsItem,index) of list" :class="{borderRight: index%2 == 0}">
                    <div class="dbr-item-img flex-zhong" @click="goProductDetail(goodsItem)">
                    	<img v-lazy.container="goodsItem.image1"/>
                    </div>
                    <div class="dbr-item-right">
                    	<h5 class="ellipsis">{{goodsItem.productName}}</h5>
                    	<!--进行中-->
                    	<div class="dbr-item-main ing" v-if="goodsItem.state == 1">
                    		<p class="db-periodsNumber">期数：{{goodsItem.periodsNumber}}</p>
                    		<p class="db-mycount flex"><span >本期参与：<i class="red">{{goodsItem.buyCount}}</i></span> <span class="blue" @click="showLuckNum(goodsItem)">wo的幸运号码</span></p>
                    		<p>购买时间：{{goodsItem.created}}</p>
                    		<progrees-v class="db-progrees" :length="(goodsItem.dbTotalCount-goodsItem.dbSurplusCount)/goodsItem.dbTotalCount"></progrees-v>
                    		<p class="flex db-num">
                    			<span>总需 <i>{{goodsItem.dbTotalCount}}</i></span>
                    			<span>剩余 <i>{{goodsItem.dbSurplusCount}}</i></span>
                    		</p>
                    	</div>
                    	<!--揭晓中-->
                    	<div class="dbr-item-main" v-else-if="goodsItem.state == 2">
                    		<p class="db-periodsNumber">期数：{{goodsItem.periodsNumber}}</p>
                    		<p class="db-mycount flex"><span >本期参与：<i class="red">{{goodsItem.buyCount}}</i></span> <span class="blue">ta的幸运号码</span></p>
                    		<p>购买时间：{{goodsItem.created}}</p>
                    		<progrees-v class="db-progrees" :length="(goodsItem.dbTotalCount-goodsItem.dbSurplusCount)/goodsItem.dbTotalCount"></progrees-v>
                    		<p class="flex db-num">
                    			<span>总需 <i>{{goodsItem.dbTotalCount}}</i></span>
                    			<span>剩余 <i>{{goodsItem.dbSurplusCount}}</i></span>
                    		</p>
                    	</div>
                    	<!--已揭晓-->
                    	<div class="dbr-item-main ed" v-else>
                    		<p class="db-periodsNumber">期数：{{goodsItem.periodsNumber}}</p>
                    		<p>获奖用户：<span>{{goodsItem.winMemberName}}</span></p>
                    		<p class="db-mycount flex"><span >本期参与：<i class="red">{{goodsItem.buyCount}}</i></span></p>
                    		<p>幸运号码：<span class="red">{{goodsItem.winNumber}}</span></p>
                    		<p>购买时间：<span class="red">{{goodsItem.created}}</span></p>
                    		<p>揭晓时间：<span class="red">{{goodsItem.dbOpenTime}}</span></p>
                    		
                    	</div>
                    </div>
                    <!--进行中-->
                    <button class="dbr-buy" v-if="goodsItem.state == 1" @click="buy(goodsItem)">追加</button>
                    <!--揭晓中-->
                    <img src="../assets/img/home/isknow.png" class="dbr-buy-img1" v-else-if="goodsItem.state == 2" alt="" />
                    <!--已揭晓-->
                    <img src="../assets/img/home/edknow.png" class="dbr-buy-img2" v-else alt="" />
               	</li>
			</ul>
			<p v-if="noMore" class="noMore">
				没有更多数据啦！
			</p>
		</div>
		<alertlucknum @close="hideLuckNumAlert" v-if="showLuckNumAlert" :message="alertMessage"></alertlucknum>
		<transition name="fade">
			<shopping v-if="shoppingAlert === 'dbr'"></shopping>
		</transition>
		<div class="dbr-buybutton flex-zhong">
			<buy-button @click.native="goHome">继续夺宝</buy-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import alertlucknum from '../components/lucknum.vue';//引入幸运号弹窗
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	import buybutton from "../components/buybutton.vue";//引入按钮
	import progrees from '../components/progrees.vue';//引入进度条
	import tabbars from "../components/tabbars.vue";//引入选项卡
	import alertshopping from './shopping.vue';//引入购买弹窗
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入User
	
	export default{
		data(){
			return{
				page: 1,//页数
				list: [],//列表
				state: '',//订单状态
				loading: false,//控制加载，true会停止加载
				noMore: false,//没有更多
				from: 'dbr',
				showLuckNumAlert: false,
				alertMessage: []
			}
		},
		computed: {
		    shoppingAlert(){//是否显示购买弹窗
		    	return this.$store.state.shoppingAlert
		    }
		},
		components:{
			"buy-button": buybutton,
			"tabbars-v": tabbars,
			"progrees-v" : progrees,
			"shopping" : alertshopping,//购买弹窗
			"alertlucknum" : alertlucknum
		},
		methods:{
			hideLuckNumAlert(){
				this.showLuckNumAlert = false;
			},
			showLuckNum(item){
				Indicator.open();
				let that = this;
				this.api.afterPayOrder(User.getToken(),item.orderNum,function(data){
					Indicator.close();
					let res = data.data;
					if(res.successed){
						let luckNums = res.returnValue.dbNums.split(',');
						that.alertMessage = item;
						that.alertMessage.nums = luckNums;
						that.showLuckNumAlert = true;
					}else{
						Util.myAlert("获取失败，请稍后重试");
					}
				})
			},
			goProductDetail(item){
				this.$router.push({ 
					path: '/tab/home/productDetail',
					query: { 
						id: item.productId ,
						periodId: item.periodsId
					}
				})
			},
			buy(goodsItemMessage){
                let from = this.from;
                let that = this;
                Indicator.open();
                this.api.getUserInfo(User.getToken(),function(data){
					Indicator.close();
					let res = data.data;
					console.log(res);
					if(res.successed){
						that.$store.commit('goShopping', goodsItemMessage);
						that.$store.commit('showShopping', from);
					}else{
						Util.myAlert("请登录");
						that.$store.commit('changeAlertLogin', true);
					}
				})
                
            },
			goHome(){
				this.$router.push("/tab/home")
			},
			isThis(index){
				this.changeState(index);
				let toUrl = "/tab/account/duobao-records/" + index
				this.$router.replace(toUrl);
				this.page = 1;
				this.list = [];
				this.loading = false;
				this.noMore = false;
				this.loadMore();
			},
			changeState(index){
				console.log("index",index)
				switch (index){
					case '0'://待收货
						this.state = '';
						break;
					case '1'://已收货
						this.state = 1;
						break;
					case '2'://已过期
						this.state = 3;
						break;
					default:
						break;
				};
				console.log("this.state",this.state);
			},
			loadMore() {//获取商品列表
				Indicator.open();
				this.loading = true;
				let that = this;
				this.changeState(this.$route.params.status);
				this.api.getOrderRecord(this.page, '6', User.getToken(),this.state,
					function(res) {
						for(let v = 0; v < res.data.returnValue.length; v++) {
							that.list.push(res.data.returnValue[v]);
						};
						if(res.data.returnValue.length < 6){
							that.loading = true;
							that.noMore = true;
						}else{
							that.loading = false;
						};
						that.page++;
						Indicator.close();
					});
			},
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	#db-records{
		.content{
			top: 39px;
			bottom: 47px;
		}
		.dbr-buybutton{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 47px;
			background: #f8f8f8;
		}
		.dbr-list{
			width: 100%;
		}
		.dbr-item{
			position: relative;
			width: 100%;
			padding: 17px 5px;
			border-bottom: 1px solid #ccc;
		}
		.dbr-item-img{
			width: 33%;
			img{
				display: block;
				width: 100%;
			}
		}
		.dbr-item-right{
			padding-left: 5px;
			width: 67%;
			h5{
				width: 90%;
				font-size: 13px;
				color: #333;
				font-weight: 400;
			}
			p{
				height: 18px;
				font-size: 12px;
				color: #999;
			}
			i{
				font-style: normal;
			}
		}
		.ed{
			margin-top: 5px;
		}
		.ing{
			margin-top: 10px;
		}
		.dbr-item-main{
			width: 100%;
		}
		.red{
			color: #f93069;
		}
		.blue{
			color: #0289ff;
		}
		.db-mycount{
			width: 90%;
			span{
				display: block;
				width: 50%;
			}
		}
		.db-progrees{
			margin-top: 17px;
			margin-bottom: 10px;
			padding-right: 3px;
			width: 70%;
		}
		.db-num{
			padding-right: 3px;
			width: 70%;
			span{
				display: block;
				width: 50%;
			}
			span:nth-child(2){
				text-align: right;
			}
		}
		.dbr-buy{
			position: absolute;
			right: 2%;
			bottom: 15%;
			font-size: 12px;
		    width: 60px;
		    height: 25px;
		    background: #f93069;
		    color: #fff;
		    border-radius: 3px;
		}
		.dbr-buy-img1{
			width: 60px;
		    height: 60px;
		    position: absolute;
		    left: 80%;
		    bottom: 16%;
		}
		.dbr-buy-img2{
			width: 60px;
		    height: 60px;
		    position: absolute;
		    left: 80%;
		    bottom: 33%;
		}
	}
</style>