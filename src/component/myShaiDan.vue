<template>
	<div id="mySunOrder" class="wrapper">
		<tabbars-v @clickThis="isThis" :names='["未晒单","已晒单"]' :initTab="$route.params.status"></tabbars-v>
		<div class="content">
			<ul class="page-infinite-list sun-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
				<li class="page-infinite-listitem sun-item flex" v-for="(goodsItem,index) of list">
					<div class="sun-item-img flex-zhong">
						<img v-lazy.container="goodsItem.image1" />
					</div>
					<div class="sun-item-right">
						<h5 class="ellipsis"><span class="color999">【{{goodsItem.periodsNumber}}期】</span>{{goodsItem.productName}}</h5>
						<div class="sun-item-main">
							<p class="sun-mycount flex"><span>本期参与：{{goodsItem.buyCount}}人次</span></p>
							<p>揭晓时间：{{goodsItem.dbOpenTime}}</p>
							<p class="sun-luckNum">幸运号码：<span class="red">{{goodsItem.winNumber}}</span></p>
						</div>
					</div>
					<!--进行中-->
					<button class="sun-buy" @click="goShaiDan(goodsItem)">晒单</button>
				</li>
			</ul>
			<p v-if="noMore" class="noMore">
				没有更多数据啦！
			</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入Util
	import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
	import tabbars from "../components/tabbars.vue"; //引入选项卡

	export default {
		data() {
			return {
				page: 1, //页数
				list: [], //列表
				loading: false, //控制加载，true会停止加载
				noMore: false, //没有更多
				state: '2,3', //订单状态
			}
		},
		components: {
			"tabbars-v": tabbars,
		},
		methods: {
			goShaiDan(item) {
				this.$router.push({
					path: "/tab/account/goShaiDan",
					query: {
						periodsNumber: item.periodsNumber,
						orderId: item.orderId,
						nickName: item.winMemberName,
						productName: item.productName,
						productId: item.productId,
					}
				});
			},
			isThis(index) { //顶部选项卡
				let toUrl = "/tab/account/myShaiDan/" + index
				this.$router.replace(toUrl);
				this.page = 1;
				this.list = [];
				this.loading = false;
				this.noMore = false;
				this.loadMore();
			},
			loadMore() { //获取列表
				this.loading = true;
				if(this.$route.params.status === '0') {
					this.getNoSunOrderList();
				} else {
					this.getSunOrderList();
				}
			},
			getNoSunOrderList() {
				let that = this;
				Indicator.open();
				this.api.getNoSunOrderList(this.page, '6', User.getMemberId(), '4', 'n',
					function(res) {
						for(let v = 0; v < res.data.returnValue.length; v++) {
							that.list.push(res.data.returnValue[v]);
						};
						if(res.data.returnValue.length < 6) {
							that.loading = true;
							that.noMore = true;
						} else {
							that.loading = false;
						};
						that.page++;
						Indicator.close();
					});
			},
			getSunOrderList() {
				let that = this;
				Indicator.open();
				this.api.getMySunOrderList(this.page, '6', User.getToken(), User.getMemberId(),
					function(res) {
						for(let v = 0; v < res.data.returnValue.length; v++) {
							that.list.push(res.data.returnValue[v]);
						};
						if(res.data.returnValue.length < 6) {
							that.loading = true;
							that.noMore = true;
						} else {
							that.loading = false;
						};
						that.page++;
						Indicator.close();
					});
			}
		}
	}
</script>

<style lang="scss">
	#mySunOrder {
		.content {
			top: 39px;
			bottom: 0;
		}
		.sun-item {
			position: relative;
			width: 100%;
			height: 118px;
			padding: 17px 5px;
			border-bottom: 1px solid #ccc;
		}
		.sun-item-img {
			width: 33%;
			img {
				display: block;
				width: 86px;
			}
		}
		.sun-item-right {
			padding-left: 5px;
			width: 67%;
			h5 {
				width: 90%;
				font-size: 13px;
				color: #333;
				font-weight: 400;
				margin-bottom: 10px;
			}
			p {
				height: 18px;
				font-size: 12px;
				color: #999;
			}
			.sun-luckNum {
				margin-top: 8px;
				font-size: 14px;
			}
		}
		.sun-item-main {
			width: 100%;
		}
		.sun-mycount {
			width: 90%;
			span {
				display: block;
				width: 50%;
			}
		}
		.sun-buy {
			position: absolute;
			right: 4%;
			bottom: 5%;
			font-size: 14px;
			width: 60px;
			height: 30px;
			background: #f93069;
			color: #fff;
			border-radius: 3px;
		}
	}
</style>