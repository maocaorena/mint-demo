<template>
	<div id="first">
		<!--<mt-swipe :auto="4000">
		  	<mt-swipe-item v-for="item in data">
		  		<img v-bind:src="item.adImgUrl"/>
		  	</mt-swipe-item>
		</mt-swipe>-->
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
		
	      <ul class="page-infinite-list" 
	      	v-infinite-scroll="loadMore"
	      	 infinite-scroll-disabled="loading" 
	      	 infinite-scroll-distance="50" 
	      	 infinite-scroll-immediate-check="true">
	        <li v-for="item in list" class="page-infinite-listitem">
	        	<transition>
		        	<router-link class="flex flex-s flex-sc" :to="{ path: 'detail', query: { id: item.productId ,periodId: item.periodsId}}">
						<img style="width: 20%;" :src="item.image1" />
						<span>{{ item.productName }}</span>
					</router-link>
				</transition>
	        </li>
	      </ul>
	      <p v-show="loading" class="page-infinite-loading">
	        <mt-spinner type="fading-circle"></mt-spinner>
	        	加载中...
	      </p>
		<!--<div class="homeList">
			<div class="productItem" v-for="item in list">
				<img v-bind:src="item.image1"/>
				<p>{{item.productName}}</p>
			</div>
			<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
		</div>-->
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
		.page-infinite-listitem{
			height: 100px;
			text-align: center;
			border-bottom: 1px solid #ccc;
		}
		.page-infinite-loading{
			text-align: center;
		}
		.mint-spinner-fading-circle{
			margin: 0 auto;
		}
	}
</style>
<script type="text/javascript">
	import API from '../api/API';
	const api = new API();
	import { Indicator } from 'mint-ui';
	import InfiniteLoading from 'vue-infinite-loading';
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
		        wrapperHeight: 0
			}
		},
		methods: {
			loadMore() {
		        this.loading = true;
		        let that = this;
		        console.log(that.page);
		        setTimeout(() => {
					api.getN("product/getProductListApi.json", {
						"appKey": "1111",
						"status": "popularity",
						"page_index": that.page,
						"page_size": "6"
					})
					.then(function(res) {
						for(let v = 0;v < res.data.returnValue.length;v++){
							that.list.push(res.data.returnValue[v]);
						};
						that.page++;
					});
		          	this.loading = false;
		        },500)
		    }

		},
		created() {
			this.loadMore();
		},
		mounted() {
	      	let that = this;
			
		}
	}
</script>