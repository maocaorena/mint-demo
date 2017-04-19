<template>
	<div id="first">
		<mt-swipe :auto="4000">
		  	<mt-swipe-item v-for="item in data">
		  		<img v-bind:src="item.adImgUrl"/>
		  	</mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<style lang="scss">
	#first{
		height: 1.25rem;
		.mint-swipe{
			.mint-swipe-items-wrap{
				.mint-swipe-item{
					img{
						width: 100%;
						vertical-align: bottom;
					}
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
			//获取信息列表
			api.getN("adv/advApi.json",{"appKey":"1111"})
				.then(function(res) {
					that.data = res.data.returnValue;
				})
				.catch(function(err) {
					console.log(err);
				})
	
		},
		data() {
			return {
				name:"damaoa",
					swiperImgs: [],
					data: []
				}
			}
	}
</script>
