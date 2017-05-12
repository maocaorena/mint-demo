<template>
	<div id="first">
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
				<router-link class="flex flex-s flex-zhong" to="/second">
					<img src="src/assets/img/discover/home_sorts@2x.png" />
					<span>分类</span>
				</router-link>
				<router-link class="flex flex-s flex-sc" to="/second">
					<img src="src/assets/img/discover/home_share@2x.png" />
					<span>晒单</span>
				</router-link>
				<router-link class="flex flex-s flex-sc" to="/find">
					<img src="src/assets/img/discover/home_packet@2x.png" />
					<span>充值</span>
				</router-link>
				<router-link class="flex flex-s flex-sc" to="/me">
					<img src="src/assets/img/discover/pk@2x.png" />
					<span>PK</span>
				</router-link>
				<router-link class="flex flex-s flex-sc" to="/me">
					<img src="src/assets/img/discover/home_service@2x.png" />
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
			<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60" infinite-scroll-immediate-check="true">
					<li v-for="item in list" class="page-infinite-listitem">
						<router-link class="flex flex-s flex-sc" :to="{ path: '/tab/home/productDetail', query: { id: item.productId ,periodId: item.periodsId}}">
							<img v-lazy.container="item.image1" />
						</router-link>
						<p class="productName">{{ item.productName }}</p>
						<progrees-v class="jindu" :length="(item.dbTotalCount-item.dbSurplusCount)/item.dbTotalCount"></progrees-v>
						<p>总需{{item.dbTotalCount}}|剩余{{item.dbSurplusCount}}</p>
						<button @click="buy(item)">购买</button>
					</li>
					<li style="clear: both;"></li>
				</ul>
			</div>
		</div>
		<shopping v-if="shoppingAlert"></shopping>
		<footer-bar></footer-bar>
	</div>
</template>
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
					width: 25%;
					text-align: center;
					img {
						width: 50%;
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
						width: 50%;
						height: 241px;
						float: left;
						text-align: center;
						border-bottom: 1px solid #ccc;
						img{
							width: 135px;
							height: 135px;
						}
						.jindu{
							width: 80%;
							margin: 0 auto;
						}
						.productName{
							width: 100%;
							height: 34px;
							padding: 0 10px;
							font-size: 13px;
							text-align: left;
							overflow: hidden;
							color: #50575d;
						}
						button{
							width: 100%;
							height: 20px;
						}
					}
					
				}
			}
			.mint-spinner-fading-circle {
				margin: 0 auto;
			}
		}
	}
</style>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	import alertshopping from './shopping.vue';//引入购买弹窗
	import footerbar from './tab.vue';//引入底部栏
	import progrees from '../components/progrees.vue';//引入进度条
	import store from '../store/';//引入vuex
	import '../plugins/swiper/swiper.min.js';
	import '../plugins/swiper/swiper.min.css';
	
	export default {
		name: "first",
		data() {
			return {
				swiperImgs: [],
				list: [],
				page: 1,
				loading: false,
				wrapperHeight: 0,
				loadMoreSwitch: true,
				showShopping: false,
				goShopping: null,
				labas:[]
			}
		},
		computed: {
		    count () {
		      	return store.state.count
		    },
		    shopping(){
		    	return store.state.shopping
		    },
		    shoppingAlert(){
		    	return store.state.shoppingAlert
		    }
		},
		components: {
			"shopping" : alertshopping,
			"footer-bar" : footerbar,
			"progrees-v" : progrees
		},
		methods: {
			getBannerImg(){
				let that = this;
				this.axios.get('adv/advApi.json')
					.then(function (response) {
					    that.swiperImgs = response.data.returnValue;
					}).then(function(){
		           		let mySwiper = new Swiper ('#homeSwipe', {
						    loop: true,
						    autoplay: 2000,
						    autoplayDisableOnInteraction: false,
						    // 如果需要分页器
						    pagination: '.swiper-pagination',
						})        
		           	}).catch(function (error) {
					    console.log(error);
					});
			},
			getLaba(){
				let that = this;
				this.axios.get('period/getwinMemberPeriodData.json')
					.then(function (response) {
					    that.labas = response.data.returnValue;
					}).then(function(){
		           		let mySwiper = new Swiper ('#homelaba', {
		           			direction : 'vertical',
		           			speed: 1000,
						    loop: true,
						    autoplay: 2000,
						    autoplayDisableOnInteraction: false,
						    
						})        
		           	}).catch(function (error) {
					    console.log(error);
					});
			},
			loadMore() {
				Indicator.open({
		            text: '加载中...',
		            spinnerType: 'fading-circle'
		        });
				this.loading = true;
				let that = this;
				setTimeout(() => {
					this.axios.get('product/getProductListApi.json', {
							params:{
								"appKey": "1111",
								"status": "popularity",
								"page_index": that.page,
								"page_size": "6"
							}
						})
						.then(function(res) {
							for(let v = 0; v < res.data.returnValue.length; v++) {
								that.list.push(res.data.returnValue[v]);
							};
							if(res.data.returnValue.length==0){
								that.loading = true;
							}else{
								that.loading = false;
							};
							that.page++;
							Indicator.close();
						}).catch(function(err){
							Indicator.close();
						});
					this.loading = false;
				}, 500);
				
			},
			buy(item){
				store.commit('goShopping', item);
				store.commit('hideShopping', true);
			}
		},
		created() {
			this.loadMore();
			this.getBannerImg();
			this.getLaba();
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>