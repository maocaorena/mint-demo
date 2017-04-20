<template>
	<div id="first">
		<mt-swipe :auto="4000">
		  	<mt-swipe-item v-for="item in data">
		  		<img v-bind:src="item.adImgUrl"/>
		  	</mt-swipe-item>
		</mt-swipe>
		<div class="flex nav">
			<router-link class="flex flex-s flex-sc" to="/second">
				<img src="src/assets/img/discover/home_sorts@2x.png"/>
				<span>分类</span>
			</router-link>
			<router-link class="flex flex-s flex-sc" to="/second">
				<img src="src/assets/img/discover/home_sorts@2x.png"/>
				<span>分类</span>
			</router-link>
			<router-link class="flex flex-s flex-sc" to="/find">
				<img src="src/assets/img/discover/home_sorts@2x.png"/>
				<span>分类</span>
			</router-link>
			<router-link class="flex flex-s flex-sc" to="/me">
				<img src="src/assets/img/discover/home_sorts@2x.png"/>
				<span>分类</span>
			</router-link>
		</div>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
		  <ul>
		    <li v-for="item in productList"><img v-bind:src="item.image1"/></li>
		  </ul>
		</mt-loadmore>
		<!--<div class="homeList">
			<div class="homeItem" v-for="item in productList">
				<img v-bind:src="item.image1"/>
				<p>{{item.productName}}</p>
			</div>
		</div>-->
	</div>
</template>
<style lang="scss">
	#first{
		margin-bottom: 106px;
		.mint-swipe{
			height: 125px;
		.mint-swipe{
			.mint-swipe-items-wrap{
				.mint-swipe-item{
					img{
						width: 100%;
					}
				}
			}
		}
		.nav{
			width: 100%;
			padding: 10px 0;
			border-bottom: 1px solid #eee; 
			.flex{
				width: 25%;
				
				img{
					width: 50%;
				}
				span{
					font-size: 14px;
				}
			}
		}
		.homeList{
			width: 100%;
			padding: 1px 0;
			.homeItem{
				width: 50%;
				padding: 1px;
				float: left;
				img{
					width: 80%;
				}
			}
		}
	}
	
	.mint-swipe-indicator.is-active {
	    background: #999;
	}
</style>
<script type="text/javascript">
	import API from '../api/API';
	const api = new API();
	import { Indicator } from 'mint-ui';
	export default {
		name: "first",
		beforeMount() {
			let that = this;
			//获取轮播列表

			api.getN("adv/advApi.json",{"appKey":"1111"})
				.then(function(res) {
					that.data = res.data.returnValue;
				})
				.catch(function(err) {
					console.log(err);
				});
			//获取商品列表
			api.getN("product/getProductListApi.json",{"appKey":"1111","status":"popularity","page_index":"1","page_size":"6"})
				.then(function(res) {
					that.productList = res.data.returnValue;
				})
				.catch(function(err) {
					console.log(err);
				});
	
		},
		data() {
			return {
				name:"damaoa",
				swiperImgs: [],
				data: [],
				productList: []
			}
		},
		mounted(){
			function loadMore(){
				api.getN("product/getProductListApi.json",{"appKey":"1111","status":"popularity","page_index":"1","page_size":"6"})
				.then(function(res) {
					that.productList.append(res.data.returnValue);
				})
				.catch(function(err) {
					console.log(err);
				});
			};
		}
	}
</script>
