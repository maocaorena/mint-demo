<template>
	<div id="imageText">
        <div v-html="productDetail.productDetail">
        </div>
	</div>
</template>

<style lang="scss">
    #imageText{
        width: 100%;
        div{
            width: 100%;
            p{
                width: 100%;
                img{
                    width: 100%!important;
                    height: auto!important;
                }
            }
        }
    }
</style>

<script type="text/babel">
	export default {
		data() {
			return {
                productId: this.$route.query.goodsId,
				periodId: this.$route.query.periodId,
                productDetail: {}
			};
		},
		methods: {

		},
		created() {
            let that = this;
            this.api.getImageTextMessage(this.periodId,this.productId,function(data){
                that.productDetail = data.data.returnValue;
            })
		},
		mounted() {

		}
	};
</script>
