<template>
	<div id="winningRecords" class="wrapper">
		<tabbars-v @clickThis="isThis" :names='["待收货","已收货","已过期"]'></tabbars-v>
		<div class="content">
			<ul class="page-infinite-list wr-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
				<li class="page-infinite-listitem wr-item flex" v-for="(goodsItem,index) of list" :class="{borderRight: index%2 == 0}">
                    <div class="wr-item-img flex-zhong" @click="goProductDetail(goodsItem)">
                    	<img v-lazy.container="goodsItem.image1"/>
                    </div>
                    <div class="wr-item-right">
                    	<h5 class="ellipsis"><span>【{{goodsItem.periodsNumber}}期】</span>{{goodsItem.productName}}</h5>
                    	<div class="wr-item-main">
                    		<p class="db-mycount flex"><span >本期参与：<i class="red">{{goodsItem.buyCount}}</i></span></p>
                    		<p class="db-optime">揭晓时间：<span class="red">{{goodsItem.dbOpenTime}}</span></p>
                    		<p class="db-optime">幸运号码：<span class="red">{{goodsItem.winNumber}}</span></p>
                    		
                    	</div>
                    </div>
                    <!--进行中-->
                    <button class="wr-buy" v-if="goodsItem.state == 1" @click="buy(goodsItem)">追加</button>
               	</li>
			</ul>
			<p v-if="noMore" class="noMore">
				没有更多数据啦！
			</p>
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
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	import buybutton from "../components/buybutton.vue";//引入按钮
	import tabbars from "../components/tabbars.vue";//引入选项卡
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入Util
	
	export default{
		data(){
			return{
				page: 1,//页数
				list: [],//列表
				state: '2,3',//订单状态
				loading: false,//控制加载，true会停止加载
				noMore: false,//没有更多
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
		},
		methods:{
			goHome(){
				this.$router.push("/tab/home")
			},
			isThis(index){
				console.log(index);
				switch (index){
					case 0:
						this.state = '2,3';
						break;
					case 1:
						this.state = '4';
						break;
					case 2:
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
			loadMore() {//获取商品列表
				Indicator.open();
				this.loading = true;
				let that = this;
				setTimeout(() => {
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
				}, 500);
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
			padding: 15px 5px;
		}
		.wr-item-img{
			width: 32%;
			img{
				display: block;
				width: 100%;
			}
		}
		.wr-item-right{
			padding-left: 5px;
			width: 66%;
			h5{
				margin-bottom: 6px;
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
		.wr-item-main{
			width: 100%;
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
	}
</style>