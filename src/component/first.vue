<template>
	<div id="first">
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
					<transition>
						<router-link class="flex flex-s flex-sc" :to="{ path: 'detail', query: { id: item.productId ,periodId: item.periodsId}}">
							<img style="width: 80%;" :src="item.image1" />
							<span>{{ item.productName }}</span>
						</router-link>
					</transition>
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
	import InfiniteLoading from 'vue-infinite-loading';
	/*import 'src/plugins/swiper/swiper.min.js';
	import 'src/plugins/swiper/swiper.min.css';*/
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
				loadMoreSwitch: true
			}
		},
		methods: {
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
			}

		},
		created() {
			this.loadMore();
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			
		}
	}
</script>