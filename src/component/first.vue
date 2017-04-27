<template>
	<div id="first">
		<div class="swiper-wrapper">
	        <div class="swiper-slide" v-for="item in swiperImgs">
	        	<img style="width: 100%;" :src="item.adImgUrl"/>
	        </div>
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
		<shopping v-bind:message="goShopping" v-if="showShopping"></shopping>
		<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60" infinite-scroll-immediate-check="true">
				<li v-for="item in list" class="page-infinite-listitem">
					<router-link class="flex flex-s flex-sc" :to="{ path: 'detail', query: { id: item.productId ,periodId: item.periodsId}}">
						<img style="width: 80%;" v-lazy.container="item.image1" />
					</router-link>
					<p class="productName ellipsis">{{ item.productName }}</p>
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
		<footer-bar></footer-bar>
	</div>
</template>
<style lang="scss">
	#first {
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
		.productItem {
			width: 50%;
			padding: 1px;
			float: left;
			img {
				width: 80%;
			}
		}
		.page-infinite-listitem {
			width: 50%;
			height: 241px;
			float: left;
			text-align: center;
			border-bottom: 1px solid #ccc;
			.productName{
				width: 100%;
				height: 42px;
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
	import API from '../api/API';
	const api = new API();
	import { Indicator } from 'mint-ui';
	import alertshopping from './shopping.vue';
	import footerbar from './tab.vue';
	import store from '../store/';
	import '../plugins/swiper/swiper.min.js';
	import '../plugins/swiper/swiper.min.css';
	export default {
		name: "first",
		data() {
			return {
				name: "damaoa",
				swiperImgs: [],
				data: [],
				list: [],
				page: 1,
				loading: false,
				allLoaded: false,
				wrapperHeight: 0,
				loadMoreSwitch: true,
				showShopping: false,
				goShopping: null
			}
		},
		computed: {
		    count () {
		      	return store.state.count
		    }
		},
		components: {
			"shopping" : alertshopping,
			"footer-bar" : footerbar
		},
		methods: {
			getBannerImg(){
				let that = this;
		        //获取信息列表
		        let response = api.getN("adv/advApi.json",{"appKey":"1111"});
		        response.then(function(res){
		        		that.swiperImgs = res.data.returnValue;
		            })
		        	.then(function(){
		        		console.log("111")
		        		let mySwiper = new Swiper ('.swiper-container', {
						    direction: 'vertical',
						    loop: true,
						})
		        	})
		            .catch(function(err){
		                console.log(err);
		            });
			},
			loadMore() {
				this.loading = true;
				let that = this;
				if(that.loadMoreSwitch){
					setTimeout(() => {
						api.getN("product/getProductListApi.json", {
								"appKey": "1111",
								"status": "popularity",
								"page_index": that.page,
								"page_size": "6"
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
				this.goShopping = item;
				this.showShopping = !this.showShopping;
			}
		},
		created() {
			this.loadMore();
			this.getBannerImg();
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			console.log(this.count);
			  
		}
	}
</script>