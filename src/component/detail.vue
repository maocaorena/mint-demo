<template>
	<div id="detail">
		<h1>1111111111</h1>
		<input type="text" name="" id="" value="aaa" />
		<img :src="productDetail.image1" alt="" />
		<img :src="productDetail.image1" alt="" />
		<p>{{ productDetail.productId }}</p>
		<p>{{ productDetail.productName }}</p>
		<p>{{ productDetail.sortNumber }}</p>
	</div>
</template>
<style lang="scss">
	#detail {
		img{
			width: 100%;
		}
	}
</style>
<script type="text/javascript">
	import API from '../api/API';
	const api = new API();
	import { Indicator } from 'mint-ui';
	export default {
		name: "first",
		data() {
			return {
				swiperImgs: [],
				productId: this.$route.query.id,
				periodId: this.$route.query.periodId,
				productDetail : {}
			}
		},
		methods: {
			
		},
		created() {
			let that = this;
			let getProductDetail = api.getN("product/getProductDetailApi.json",{"periodId":this.periodId});
			getProductDetail.then(function(res){
				that.productDetail = res.data.returnValue;
				console.log(that.productDetail);
			})
			.catch(function(err){
				
			})
		},
		mounted() {
			console.log("mounted")
		}
	}
</script>