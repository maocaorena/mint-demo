<template>
	<div id="winningRecords" class="wrapper">
		<tabbars-v @clickThis="isThis" :names='["待收货","已收货","已过期"]'></tabbars-v>
		<div class="content">
			<ul class="page-infinite-list wr-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
				<li class="page-infinite-listitem wr-item flex" v-for="(goodsItem,index) of list" :class="{borderRight: index%2 == 0}">
                    <div class="wr-item-img flex-zhong" @click="goProductDetail(goodsItem)">
                    	<img class="pic" v-lazy.container="goodsItem.image1"/>
                    	<img class="indexIcon" src="../assets/img/account/share_prize@2x.png"/>
                    </div>
                    <div class="wr-item-right">
                    	<h5 class="ellipsis"><span>【{{goodsItem.periodsNumber}}期】</span>{{goodsItem.productName}}</h5>
                    	<div class="wr-item-main">
                    		<p class="db-mycount flex">本期参与：{{goodsItem.buyCount}}次</p>
                    		<p class="db-optime">揭晓时间：{{goodsItem.dbOpenTime}}</p>
                    		<p class="db-lucknum">幸运号码：{{goodsItem.winNumber}}</p>
                    	</div>
                    </div>
                    <!--领取奖品-->
                    <button class="wr-buy"  v-if="goodsItem.address == null && goodsItem.orderState != 5 && state=='2,3'" @click="getPrize(goodsItem,index)">领取奖品</button>
                    <button class="wr-buy" v-if="goodsItem.orderState == 4&&goodsItem.isSunOrder === 'n'" >去晒单</button>
               	</li>
			</ul>
			<p v-if="noMore" class="noMore">
				没有更多数据啦！
			</p>
		</div>
		<div class="prize-alert flex-zhong" v-if="prizeAlert">
			<div class="prize-alert-one" v-if="prizeStep === 1">
				<h5 class="prize-alert-one-tit flex flex-hlr"><span>选择领奖方式</span> <i @click="hidePrize" class="iconfont icon-cha"></i></h5>
				<div class="prize-alert-one-item flex flex-s flex-hc" @click="selectPrizeType(1)" :class="{prizeAlertItemred: prizeType == 1}">
					<p class="toWhere">充值到夺宝账户</p>
					<p class="howTo">充值夺宝点，可继续参与夺宝</p>
				</div>
				<div class="prize-alert-one-item flex flex-s flex-hc" @click="selectPrizeType(2)" :class="{prizeAlertItemred: prizeType == 2	}">
					<p class="toWhere">充值到手机号</p>
					<p class="howTo">充值夺宝点，可继续参与夺宝</p>
				</div>
				<buy-button @click.native="goNext">下一步</buy-button>
			</div>
			<div class="prize-alert-two" v-if="prizeStep === 2">
				<p class="flex flex-sc">确定要将奖品{{itemName}}，充值到夺宝账户吗？</p>
				<div class="flex">
					<button @click="isThisPrize(1)">取消</button>
					<button @click="isThisPrize(2)">确认</button>
				</div>
			</div>
			<div class="prize-alert-three" v-if="prizeStep === 3">
				<div class="top flex flex-s flex-hc flex-sc">
					<img src="../assets/img/new/dialog_success@2x.png"/>
					<p>充值成功！</p>
				</div>
				<div class="buttons flex">
					<button @click="isThisPrize(1)">知道了</button>
					<button @click="isThisPrize(3)">查看余额</button>
				</div>
			</div>
		</div>
		<transition name="fade">
			<shopping v-if="shoppingAlert === 'wr'"></shopping>
		</transition>
		<div class="wr-buybutton flex-zhong">
			<buy-button @click.native="goHome">继续夺宝</buy-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入Util
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	import buybutton from "../components/buybutton.vue";//引入按钮
	import tabbars from "../components/tabbars.vue";//引入选项卡
	
	export default{
		data(){
			return{
				page: 1,//页数
				list: [],//列表
				state: '2,3',//订单状态
				loading: false,//控制加载，true会停止加载
				noMore: false,//没有更多
				prizeType: 1,//选择领奖方式，1是到余额，2是到手机号
				prizeAlert: false,//遮罩层是否显示
				prizeStep: 1,//选择领取方式第一步
				itemName: '',//弹窗显示领取奖品名称
				orderId : null,//订单id
				orderIndex : null
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
		},
		methods:{
			selectPrizeType(type){//选择领取方式
				this.prizeType = type;
			},
			hidePrize(){//隐藏选择充值方式弹窗
				this.prizeAlert = false;
			},
			getPrize(item,index){//领取奖品
				console.log(item);
				if(item.productClassId == 20){
					//充值产品弹出选择框
					this.prizeAlert = true;
					this.prizeStep = 1;
					this.itemName = item.productName;
					this.orderId = item.orderId;
					this.index = index;
				}
			},
			goNext(){//下一步
				if(this.prizeType === 1){
					this.prizeStep = 2
					console.log(this.prizeType)
				}else{
					console.log(this.prizeType)
				}
			},
			isThisPrize(type){
				let that = this;
				if(type === 1){
					this.prizeAlert = false;
					this.prizeStep = 1;
				}else if (type === 2){
					Indicator.open();
					this.api.addUserBalance(User.getToken(),this.orderId,function(data){
						Indicator.close();
						let res = data.data;
						if(res.successed){
							that.prizeStep = 3;
							that.list.splice(that.index,1);
						}else{
							Util.myAlert("充值失败，请稍后重试")
						}
					})
				}else if(type === 3){
					this.$router.push("/tab/me")
				}else{
					
				}
			},
			goHome(){
				this.$router.push("/tab/home")
			},
			isThis(index){//顶部选项卡
				console.log(index);
				switch (index){
					case 0://待收货
						this.state = '2,3';
						break;
					case 1://已收货
						this.state = '4';
						break;
					case 2://已过期
						this.state = '5';
						break;
					default:
						break;
				}
				this.page = 1;
				this.list = [];
				this.loading = false;
				this.noMore = false;
				this.loadMore();
			},
			loadMore() {//获取列表
				Indicator.open();
				this.loading = true;
				let that = this;
				
				this.api.getWinRecord(this.page, '6', User.getMemberId(),this.state,
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
	#winningRecords{
		.content{
			top: 39px;
			bottom: 47px;
		}
		.wr-buybutton{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 47px;
			background: #f8f8f8;
		}
		.wr-list{
			width: 100%;
		}
		.wr-item{
			position: relative;
			width: 100%;
			padding: 17px 5px;
		}
		.wr-item-img{
			position: relative;
			width: 32%;
			.pic{
				display: block;
				width: 85%;
			}
			.indexIcon{
				position: absolute;
			    top: 65%;
			    right: 13px;
			    width: 30px;
			}
		}
		.wr-item-right{
			padding-left: 5px;
			width: 66%;
			h5{
				margin-bottom: 13px;
				width: 100%;
				font-size: 13px;
				color: #333;
				font-weight: 400;
				span{
					color: #999
				}
			}
			p{
				color: #999;
			}
			i{
				font-style: normal;
			}
		}
		.wr-item-main{
			width: 100%;
		}
		.db-mycount{
			width: 100%;
			height: 20px;
			font-size: 12px;
		}
		.db-optime{
			width: 100%;
			height: 35px;
			font-size: 12px;
		}
		.db-lucknum{
			font-size: 14px;
		}
		.wr-buy{
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
		.red{
			color: #f93069;
		}
		.blue{
			color: #0289ff;
		}
		.prize-alert{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
		}
		.prize-alert-one{
			width: 75%;
		    height: 263px;
		    background-color: #fff;
		    border-radius: 10px;
		    .buybutton{
		    	width: 90%;
		    }
		}
		.prize-alert-one-tit{
			padding: 15px;
			font-size: 14px;
    		color: #b5b5b5;
    		font-weight: 400;
    		i{
    			font-size: 12px;
    		}
		}
		.prize-alert-one-item{
			padding-left: 12px;
			height: 68px;
		    width: 90%;
		    margin: 0 auto 12px;
		    border: 1px solid #b5b5b5;
		    border-radius: 5px;
		    .toWhere{
		    	color: #333;
			    font-size: 16px;
			    margin-bottom: 8px;
		    }
		    .howTo{
		    	color: #999;
    			font-size: 12px;
		    }
		}
		.prizeAlertItemred{
			border-color: #f43069;
		    .toWhere{
	    	    color: #f43069;
		    }
		}
		.prize-alert-two{
			width: 75%;
		    height: 150px;
		    background-color: #fff;
		    border-radius: 10px;
		    p{
		    	width: 100%;
			    height: 100px;
			    padding: 0 13px;
			    margin: 0 auto;
			    color: #666;
			    font-size: 16px;
			    line-height: 24px;
			    overflow: hidden;
		    }
		    div{
		    	width: 100%;
		    	padding: 0 13px;
		    	button{
		    		display: block;
				    width: 49%;
				    border: none;
				    height: 36px;
				    background: #f52f6a;
				    border-radius: 5px;
				    color: #fff;
		    	}
		    	button:nth-child(1){
		    		margin-right: 5px;
		    		background: #c7c7c7;
		    	}
		    }
		}
		.prize-alert-three{
			width: 75%;
		    height: 197px;
		    background-color: #fff;
		    border-radius: 10px;
		    .top{
		    	width: 100%;
		    	height: 145px;
		    }
		    img{
		    	display: block;
			    width: 98px;
			    margin-bottom: 5px;
		    }
		    .buttons{
		    	width: 100%;
		    	padding: 0 13px;
		    	button{
		    		display: block;
				    width: 49%;
				    border: none;
				    height: 36px;
				    background: #f52f6a;
				    border-radius: 5px;
				    color: #fff;
		    	}
		    	button:nth-child(1){
		    		margin-right: 5px;
		    		background: #c7c7c7;
		    	}
		    }
		}
	}
</style>