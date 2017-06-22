<template>
	<div id="first" class="wrapper">
		<div class="content">
			<div class="swiper-container" id="homeSwipe">
			    <div class="swiper-wrapper">
			        <div v-for="item in swiperImgs" class="swiper-slide">
			        	<img style="width: 100%;" :src="item.adImgUrl"/>
			        </div>
			    </div>
			    <!-- 如果需要分页器 -->
			    <div class="swiper-pagination"></div>
			</div>
			<div class="flex nav">
				<router-link class="flex flex-s flex-zhong" to="/tab/home/category">
					<img src="../assets/img/discover/home_sorts@2x.png" />
					<span>分类</span>
				</router-link>
				<router-link class="flex flex-s flex-sc" to="/tab/home/single">
					<img src="../assets/img/discover/home_share@2x.png" />
					<span>晒单</span>
				</router-link>
				<router-link class="flex flex-s flex-sc" to="/find">
					<img src="../assets/img/discover/home_packet@2x.png" />
					<span>充值</span>
				</router-link>
				<router-link class="flex flex-s flex-sc" to="/me">
					<img src="../assets/img/discover/pk@2x.png" />
					<span>PK</span>
				</router-link>
				<router-link class="flex flex-s flex-sc" to="/tab/home" >
					<img src="../assets/img/discover/home_service@2x.png" @click="showServer()"/>
					<span>客服</span>
				</router-link>
			</div>
			<div class="swiper-container" id="homelaba">
			    <div class="swiper-wrapper">
			        <div v-for="item in labas" class="swiper-slide ellipsis">
			        	恭喜{{item.nickName}}夺取{{item.productName}}
			        </div>
			    </div>
			</div>
			<tabbars-v v-on:clickThis="isThis" :names = '["人气","剩余"]' :tostatus = 'status' :showTop = '"y"'></tabbars-v>
			<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
					<li class="page-infinite-listitem" v-for="(goodsItem,index) in list" :class="{borderRight: index%2 == 0}">
                        <goods-item :goodsMessage = "goodsItem" :from = "'home'"></goods-item>
                    </li>
					<li style="clear: both;"></li>
				</ul>
				<p v-if="noMore" class="noMore">
					没有更多了
				</p>
			</div>
		</div>
		<transition name="fade">
			<shopping v-if="shoppingAlert === 'home'"></shopping>
		</transition>
		<server-alert v-if="serverState"></server-alert>
		<footer-bar></footer-bar>
	</div>
</template>

<script type="text/javascript">
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	import alertshopping from './shopping.vue';//引入购买弹窗
	import footerbar from './tab.vue';//引入底部栏
	import server from './server.vue';//引入客服
	import goodsItem from '../components/goodsItem.vue';//引入单个商品样式
	import tabbars from '../components/tabbars.vue';//引入选项卡组件
	import '../plugins/swiper/swiper.min.js';
	import '../plugins/swiper/swiper.min.css';

	export default {
		name: "first",
		data() {
			return {
				swiperImgs: [],//轮播图片
				list: [],//商品列表
				page: 1,//页数
				status: 'popularity',//排序方式
				labas:[],//首页十条小喇叭
				serverState : false,//控制客服显示和关闭
				loading: false,//控制加载，true会停止加载
				noMore: false,//没有更多
				wrapperHeight: 0,
			}
		},
		computed: {
		    shoppingAlert(){//是否显示购买弹窗
		    	return this.$store.state.shoppingAlert
		    },
		    loginState(){
		    	console.log(11111);
		    	if(this.$store.state.loginState == 2){
//		    		this.showServer();
		    	}
		    	return this.$store.state.loginState
		    }
		},
		components: {
			"shopping" : alertshopping,//购买弹窗
			"footer-bar" : footerbar,//底部栏
			"server-alert" : server,//客服弹窗
			"goods-item" : goodsItem,//单个商品
			"tabbars-v" : tabbars//选项卡
		},
		methods: {
			showServer(){//显示客服弹窗
				this.serverState = !this.serverState;
			},
			getBannerImg(){//获取轮播图片
				let that = this;
				this.api.getHomeSwiperList('11111111',
				function(data){
					that.swiperImgs = data.data.returnValue;
				},function(){
					let mySwiper = new Swiper ('#homeSwipe', {
						loop: true,
						autoplay: 2000,
						autoplayDisableOnInteraction: false,
						// 如果需要分页器
						pagination: '.swiper-pagination',
					});
				})
			},
			getLaba(){//获取首页十条喇叭信息
				let that = this;
				this.api.getHomeSwiperWinList('111111',
					function (data) {
						that.labas = data.data.returnValue;
					},
					function () {
						let mySwiper = new Swiper ('#homelaba', {
							direction : 'vertical',
							speed: 1000,
							loop: true,
							autoplay: 1500,
							autoplayDisableOnInteraction: false,

						});
					}
				);
			},
			loadMore() {//获取商品列表
				Indicator.open();
				this.loading = true;
				let that = this;
				setTimeout(() => {
					this.api.getProductList("1111",this.status,this.page,"6",
						function(res) {
							for(let v = 0; v < res.data.returnValue.length; v++) {
								that.list.push(res.data.returnValue[v]);
							};
							if(res.data.returnValue.length==0){
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
			
			isThis(index){//选项卡选择
				let _index = index;
				if(_index === 0){
					this.page = 1;
					this.list = [];
					this.status = "popularity";
					this.loadMore();
				}else if(_index === 1){
					this.page = 1;
					this.list = [];
					if(this.status === "surplusasc"){
						this.status = "surplusdesc";
					}else{
						this.status = "surplusasc";
					}
					this.loadMore();
				};
			}
		},
		created() {
			this.getLaba();
		},
		mounted() {
			this.getBannerImg();
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>
<style lang="scss">
	#first {
		.content{
			top: 0;
			bottom: 47px;
			.nav {
				width: 100%;
				padding: 10px 0;
				border-bottom: 1px solid #eee;
				.flex {
					width: 20%;
					text-align: center;
					img {
						width: 38px;
					}
					span {
						display: block;
						font-size: 12px;
						color: #666;
					}
				}
			}
			#homelaba{
				height: 38px;
				width: 100%;
				border-bottom: 8px solid #eee;
				line-height: 30px;
				font-size: 12px;
				padding-left: 30px;
			}
			.page-infinite-wrapper{
				width: 100%;
				.page-infinite-list{
					width: 100%;
					.page-infinite-listitem {
						padding: 0 3px 5px 3px;
						width: 50%;
						height: 241px;
						float: left;
						text-align: center;
						border-bottom: 1px solid #f2f2f2;
					}
					.borderRight{
						border-right: 1px solid #f2f2f2;
					}
				}
			}
			.mint-spinner-fading-circle {
				margin: 0 auto;
			}
		}
	}
</style>
