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
		<div class="page-loadmore">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
					<ul class="page-loadmore-list">
						<li v-for="item in productList" class="page-loadmore-listitem productItem">
							<img v-bind:src="item.image1" alt="" />
							<p>{{item.productName}}</p>
						</li>
					</ul>
					<div slot="bottom" class="mint-loadmore-bottom">
						<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
						<span v-show="bottomStatus === 'loading'">
		            <mt-spinner type="snake"></mt-spinner>
		          </span>
					</div>
				</mt-loadmore>
			</div>
		</div>
		<!--<div class="homeList">
			<div class="homeItem" v-for="item in productList">
				<img v-bind:src="item.image1"/>
				<p>{{item.productName}}</p>
			</div>
		</div>-->
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
	export default {
		name: "first",
		beforeMount() {
			
		},
		data() {
			return {
				name: "damaoa",
				swiperImgs: [],
				data: [],
				productList: [],
				list: [],
				allLoaded: false,
				bottomStatus: '',
				wrapperHeight: 0
			}
		},
		methods: {
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			loadBottom() {
				setTimeout(() => {
					console.log("2");
					let lastValue = this.productList[this.productList.length - 1];
					console.log(lastValue);
					if(lastValue < 40) {
						console.log("1");
						this.getList();
					} else {
						this.allLoaded = true;
					}
					this.$refs.loadmore.onBottomLoaded();
				}, 500);
			},
			getList(){
				let that = this;
				api.getN("product/getProductListApi.json", {
					"appKey": "1111",
					"status": "popularity",
					"page_index": "1",
					"page_size": "6"
				})
				.then(function(res) {
					for(let v = 0;v<res.data.returnValue.length;v++){
						that.productList.push(res.data.returnValue[v]);
					};
					console.log(that.productList)
				})
				.catch(function(err) {
					console.log(err);
				});
			}
			
		},
		created() {
			this.getList();
			//获取商品列表
			
	    },
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>