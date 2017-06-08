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
		<shopping v-if="shoppingAlert === 'home'"></shopping>
		<server-alert v-if="serverState"></server-alert>
		<footer-bar></footer-bar>
	</div>
</template>

<script type="text/javascript">
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	import alertshopping from './shopping.vue';//引入购买弹窗
	import footerbar from './tab.vue';//引入底部栏
	import progrees from '../components/progrees.vue';//引入进度条
	import server from './server.vue';//引入客服
	import goodsItem from '../components/goodsItem.vue';//引入单个商品样式
	import tabbars from '../components/tabbars.vue';//引入选项卡组件
	import '../plugins/swiper/swiper.min.js';
	import '../plugins/swiper/swiper.min.css';

	export default {
		name: "first",
		data() {
			return {
				swiperImgs: [],
				list: [],
				page: 1,
				status: 'popularity',
				loading: false,
				wrapperHeight: 0,
				loadMoreSwitch: true,
				showShopping: false,
				goShopping: null,
				labas:[],
				noMore: false,
				serverState : false
			}
		},
		computed: {
		    count () {
		      	return this.$store.state.count
		    },
		    shopping(){
		    	return this.$store.state.shopping
		    },
		    shoppingAlert(){
		    	return this.$store.state.shoppingAlert
		    }
		},
		components: {
			"shopping" : alertshopping,
			"footer-bar" : footerbar,
			"progrees-v" : progrees,
			"server-alert" : server,
			"goods-item" : goodsItem,
			"tabbars-v" : tabbars
		},
		methods: {
			showServer(){
				this.serverState = !this.serverState;
			},
			getBannerImg(){
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
			getLaba(){
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
							autoplay: 2000,
							autoplayDisableOnInteraction: false,

						});
					}
				);
			},
			loadMore() {
				Indicator.open({
		            text: '加载中...',
		            spinnerType: 'fading-circle'
		        });
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
				}, 100);
			},
			buy(item){
				this.$store.commit('goShopping', item);
				this.$store.commit('showShopping', "home");
			},
			isThis(index){
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
			this.getBannerImg();
			this.getLaba();
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>
<style lang="scss">
	#first {
		width: 100%;
		height: 100%;
		position: absolute;
		.content{
			width: 100%;
			height: auto;
			position: absolute;
			top: 0;
			bottom: 45px;
			overflow: auto;
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
						font-size: 14px;
					}
				}
			}
			#homelaba{
				height: 30px;
				width: 100%;
				border-bottom: 1px solid #eee;
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
