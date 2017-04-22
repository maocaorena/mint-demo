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
		<div class="homeList">
			<div class="productItem" v-for="item in list">
				<img v-bind:src="item.image1"/>
				<p>{{item.productName}}</p>
			</div>
			<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
		</div>
	</div>
</template>
<style lang="scss">
	#first {
		margin-bottom: 106px;
		.mint-swipe {
			.mint-swipe-items-wrap {
				.mint-swipe-item {
					img {
						width: 100%;
					}
				}
			}
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
		.mint-loadmore {
			overflow: visible;
		}
		
		.productItem {
			width: 50%;
			padding: 1px;
			float: left;
			img {
				width: 80%;
			}
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
				list: []
			}
		},
		components: {
		    InfiniteLoading
		},
		methods: {
			onInfinite() {
				console.log("111");
				this.getData();
		  	},
		  	getData(){
		  		let that = this;
				api.getN("product/getProductListApi.json", {
					"appKey": "1111",
					"status": "popularity",
					"page_index": "1",
					"page_size": "6"
				})
				.then(function(res) {
					if(res.data.returnValue.length == 6){
						console.log("aaaa");
						for(let v = 0;v < res.data.returnValue.length;v++){
							that.list.push(res.data.returnValue[v]);
						};
						this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
						
					}else{
						this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
					};
				})
				.catch(function(err) {
					
				});
		  	}
			
		},
		created() {
			
	    },
		mounted() {
			
		}
	}
</script>