<template>
	<div id="detail" class="wrapper">
		<div class="content">
			<div class="goHome" @click="goHome">
				<img src="../assets/img/two/more@2x.png" />
			</div>
			<div class="swiper-container" id="detailSwiper">
				<div class="swiper-wrapper">
					<div v-for="item in productDetail.img" class="swiper-slide">
						<img :src="item" />
					</div>
				</div>
				<!-- 分页器 -->
				<div class="swiper-pagination"></div>
			</div>
			<div class="productMessage">
				<img class="badge" v-if="productDetail.productType == 3" src="../assets/img/home/ten_l@2x.png">
				<img class="badge" v-if="productDetail.productType == 4" src="../assets/img/two/twobig.png">
				<img class="badge" v-if="productDetail.productType == 5" src="../assets/img/home/five_l@2x.png">
				<img class="badge" v-if="productDetail.productType == 6" src="../assets/img/home/hundred_l@2x.png">
				<p class="pmTop">
					<span v-if="productStaus == 'ing'">进行中</span>
					<span v-else-if="productStaus == 'publishing'">揭晓中</span>
					<span v-else>已揭晓</span>
					<span>【{{ productDetail.periodsNumber }} 期】</span>
				</p>
				<p class="pmName">{{ productDetail.productName }}</p>
			</div>
			<!--进行中 进度条-->
			<div v-if="productStaus == 'ing'" class="progrees">
				<progrees-v class="detailProgrees" :length="(productDetail.dbTotalCount-productDetail.dbSurplusCount)/productDetail.dbTotalCount"></progrees-v>
				<div class="pmNum flex">
					<p>总需 <span>{{productDetail.dbTotalCount}}</span> 人次</p>
					<p>剩余 <span>{{productDetail.dbSurplusCount}}</span> 人次</p>
				</div>
			</div>
			<!--揭晓中 倒计时-->
			<count-Down v-else-if="productStaus == 'publishing'" :time="dbOpenTimeLong">
				<i class="iconfont icon-nn"></i>
			</count-Down>
			<!--已揭晓 中奖信息-->
			<div v-else class="winnerMessage">
				<div class="wmTop flex">
					<div class="left">
						幸运号码：{{winnnerMessage.winNumber}}
					</div>
					<div class="right">
						<span>计算规则</span>
					</div>
				</div>
				<div class="wmCon flex">
					<div class="winnerHead flex-zhong">
						<div class="img flex-zhong">
							<img :src="winnnerMessage.memberFace" />
						</div>
					</div>
					<div class="winText flex flex-s flex-hc">
						<p>获奖者：{{winnnerMessage.winMemberName}}</p>
						<p>本期参与：{{winnnerMessage.winMemberBuyCount}}</p>
						<p>揭晓时间：{{winnnerMessage.dbOpenTime}}</p>
					</div>
					<div class="winPic flex-zhong">
						<img src="../assets/img/home/winner@2x.png" />
					</div>
				</div>
			</div>
			<p v-if="isiPhone" class="isiPhone">
				<span>!</span> 声明：所有商品抽奖活动与苹果公司（Apple Inc）无关
			</p>
			<menu-bar :togo="'/tab/home/imageTextMessage?goodsId='+productId+'&periodId='+periodId" :icon="'icon-tuwenxiangqing'" :title="'图文详情'"></menu-bar>
			<menu-bar :togo="'/tab/home/single?goodsId='+productId" :icon="'icon-camera'" :title="'晒单分享'"></menu-bar>
			<menu-bar :togo="'/tab/home/historyRecords?goodsId='+productId+'&periodId='+periodId" :icon="'icon-currentrecord'" :title="'本期参与记录'"></menu-bar>
			<menu-bar :togo="'/tab/home/productDetail/announced?goodsId='+productId" :icon="'icon-xunzhang1'" :title="'往期揭晓'"></menu-bar>
		</div>
		<div class="detailBottomBtn flex-zhong">
			<buy-button @click.native="showBuy">立即购买</buy-button>
		</div>
		<shopping v-if="shoppingAlert === 'productDetail'"></shopping>
	</div>
</template>
<style lang="scss">
	#detail {
		width: 100%;
		height: 100%;
		position: absolute;
		.content {
			width: 100%;
			height: auto;
			overflow: auto;
			position: absolute;
			bottom: 45px;
			top: 0;
			.goHome {
				position: absolute;
				right: 12px;
				top: 10px;
				width: 74px;
				height: 20px;
				z-index: 12;
				img {
					width: 100%;
					height: 100%;
					vertical-align: bottom;
				}
			}
			#detailSwiper {
				.swiper-wrapper {
					.swiper-slide {
						text-align: center;
						img {
							width: 50%;
						}
					}
				}
				padding-top: 40px;
				padding-bottom: 40px;
			}
			.productMessage {
				position: relative;
				width: 100%;
				padding: 0 15px;
				.badge {
					width: 46px;
					position: absolute;
					top: -63px;
					left: 15px;
					z-index: 2;
				}
				.pmTop {
					font-size: 12px;
					margin-bottom: 5px;
					span:nth-child(1) {
						color: #f93069;
						border: 1px solid #f93069;
						padding: 0 3px;
						border-radius: 3px;
					}
					span:nth-child(2) {
						color: #bcbcbc;
						padding: 0 3px;
					}
				}
				.pmName {
					width: 100%;
					padding: 5px 0 10px;
					font-size: 13px;
				}
			}
			.count-down {
				margin-bottom: 10px;
				width: 100%;
				color: #f93069;
				font-size: 28px;
				text-align: center;
				i {
					font-size: 28px;
				}
			}
			.winnerMessage {
				width: 100%;
				padding: 0 15px;
				.wmTop {
					width: 100%;
					height: 45px;
					line-height: 45px;
					background: #f93069;
					border-top-left-radius: 5px;
					border-top-right-radius: 5px;
					.left {
						width: 60%;
						color: #fff;
						text-indent: 10px;
					}
					.right {
						width: 40%;
						text-align: right;
						span {
							border: 1px solid #fff;
							margin-right: 5px;
							border-radius: 3px;
							color: #fff;
							font-size: 13px;
							padding: 3px 5px;
						}
					}
				}
				.wmCon {
					width: 100%;
					padding: 10px 0;
					border: 1px solid #f5f5f5;
					margin-bottom: 10px;
					.winnerHead {
						width: 25%;
						.img {
							width: 60px;
							height: 60px;
							border: 4px solid #f3f3f3;
							border-radius: 50%;
							overflow: hidden;
							img {
								width: 100%;
								height: 100%;
							}
						}
					}
					.winText {
						width: 50%;
						p {
							width: 100%;
							font-size: 12px;
							color: #999;
						}
					}
					.winPic {
						width: 25%;
						img {
							width: 49px;
						}
					}
				}
			}
			.isiPhone {
				width: 100%;
				padding: 5px 15px;
				background: #f2f2f2;
				font-size: 12px;
				text-align: center;
				color: #999;
				span {
					display: inline-block;
					width: 14px;
					height: 14px;
					line-height: 12px;
					text-align: center;
					border-radius: 50%;
					border: 1px solid #999999;
				}
			}
			.progrees {
				width: 100%;
				padding: 0 15px;
				margin-bottom: 10px;
				.detailProgrees {
					width: 100%;
					margin: 0 auto 10px;
				}
				.pmNum {
					p {
						width: 50%;
						font-size: 12px;
						color: #999;
						span {
							color: #f93069;
						}
					}
					p:nth-child(2) {
						text-align: right;
					}
				}
			}
		}
		.detailBottomBtn {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 47px;
			border-top: 1px solid #e3e3e3;
		}
	}
</style>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';
	import progrees from '../components/progrees.vue'; //引入进度条
	import menubar from '../components/menubar.vue'; //引入菜单跳转
	import buybutton from '../components/buybutton.vue'; //引入按钮
	import alertshopping from './shopping.vue'; //引入购买弹窗
	import countDown from '../components/countdown.vue'; //引入倒计时
	import { Storage } from '../assets/js/storage.js'; //引入storage操作方法
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入User
	import '../plugins/swiper/swiper.min.js';
	import '../plugins/swiper/swiper.min.css';

	export default {
		name: "first",
		data() {
			return {
				swiperImgs: [],
				productId: this.$route.query.id,
				periodId: this.$route.query.periodId,
				productDetail: {},
				productStaus: '',
				isiPhone: false,
				winnnerMessage: {}
			}
		},
		computed: {
			shopping() {
				return this.$store.state.shopping
			},
			shoppingAlert() {
				return this.$store.state.shoppingAlert
			}
		},
		components: {
			"progrees-v": progrees,
			"menu-bar": menubar,
			"buy-button": buybutton,
			"shopping": alertshopping,
			"count-Down": countDown
		},
		methods: {
			showBuy() {
                let that = this;
                Indicator.open();
                this.api.getUserInfo(User.getToken(),function(data){
					Indicator.close();
					let res = data.data;
					console.log(res);
					if(res.successed){
						that.$store.commit('goShopping', this.productDetail);
						that.$store.commit('showShopping', "productDetail");
					}else{
						Util.myAlert("请登录");
						that.$store.commit('changeAlertLogin', true);
					}
				})
				
			},
			goHome() {
				this.$router.push('/tab/home');
			}
		},
		created() {
			let that = this;
			this.api.getProductDetail(this.periodId,
				function(data) {
					let productDetail = data.data.returnValue;
					that.productDetail = productDetail;
					if(productDetail.state == '1') {
						that.productStaus = 'ing';
					} else if(productDetail.state == '2') {
						console.log("aaa")
						that.productStaus = 'publishing';
						that.dbOpenTimeLong = Storage.getItem('thisOpenTime');
						console.log(that.dbOpenTimeLong)
					} else if(productDetail.state == '3') {
						that.productStaus = 'published';
						that.api.getWinnerMessage(that.periodId, function(data) {
							let res = data.data;
							that.winnnerMessage = res.returnValue;
							that.winnnerMessage.dbOpenTime = res.returnValue.dbOpenTime.slice(0, 16)
						});
					};
				},
				function() {
					let mySwiper = new Swiper('#detailSwiper', {
						loop: true,
						autoplay: 2000,
						autoplayDisableOnInteraction: false,
						// 如果需要分页器
						pagination: '.swiper-pagination',
					})
				}
			);
			//判断是否是iPhone
			let u = navigator.userAgent;
			let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isiOS) {
				this.isiPhone = true; //这是iOS平台下浏览器
			} else {
				this.isiPhone = false;
			};
		},
		mounted() {

		}
	}
</script>