<template>
	<div id="first">
		<div class="content">
			<div class="swiper-container">
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
					<img src="src/assets/img/discover/home_sorts@2x.png" />
					<span>分类</span>
				</router-link>
				<router-link class="flex flex-s flex-sc" to="/find">
					<img src="src/assets/img/discover/home_sorts@2x.png" />
					<span>分类</span>
				</router-link>
				<router-link class="flex flex-s flex-sc" to="/me">
					<img src="src/assets/img/discover/home_sorts@2x.png" />
					<span>分类</span>
				</router-link>
			</div>
			<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60" infinite-scroll-immediate-check="true">
					<li v-for="item in list" class="page-infinite-listitem">
						<router-link class="flex flex-s flex-sc" :to="{ path: 'detail', query: { id: item.productId ,periodId: item.periodsId}}">
							<img v-lazy.container="item.image1" />
						</router-link>
						<p class="productName">{{ item.productName }}</p>
						<p>总需{{item.dbTotalCount}}|剩余{{item.dbSurplusCount}}</p>
						<button @click="buy(item)">购买</button>
					</li>
					<li style="height: 0;width: 0;clear: both;"></li>
				</ul>
				<p v-show="!loadMoreSwitch" class="noMore paddingBottom50">没有更多了</p>
				<p v-show="loading" class="page-infinite-loading paddingBottom50">
					<mt-spinner type="fading-circle"></mt-spinner>
					加载中...
				</p>
			</div>
		</div>
		<shopping v-if="shoppingAlert"></shopping>
		<footer-bar></footer-bar>
	</div>
</template>
<style lang="scss">
	#first {
		height: 100%;
		overflow: hidden;
		.content{
			height: 100%;
			overflow: auto;
		}
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
		.page-infinite-loading {
			text-align: center;
		}
		.mint-spinner-fading-circle {
			margin: 0 auto;
		}
	}
</style>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	import alertshopping from './shopping.vue';//引入购买弹窗
	import footerbar from './tab.vue';//引入底部栏
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
				goShopping: null
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
			"footer-bar" : footerbar
		},
		methods: {
			getBannerImg(){
				let that = this;
				this.axios.get('adv/advApi.json')
					.then(function (response) {
					    that.swiperImgs = response.data.returnValue;
					}).then(function(){
		           		let mySwiper = new Swiper ('.swiper-container', {
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
			loadMore() {
				this.loading = true;
				let that = this;
				if(that.loadMoreSwitch){
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
									that.loadMoreSwitch = false;
									console.log("that.loading",that.loading);
								};
								that.page++;
							}).catch(function(err){
								console.log(err);
							});
						this.loading = false;
					}, 500);
				}else{
					this.loading = false;
				};
			},
			buy(item){
				console.log("item",item);
				store.commit('goShopping', item);
				store.commit('hideShopping', true);
			}
		},
		created() {
			this.loadMore();
			console.log("created");
			this.getBannerImg();
			
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			console.log(this.count);
			console.log("mounted");
		}
	}
</script>