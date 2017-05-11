<template>
	<div id="detail">
		<div class="content">
			<div class="swiper-container" id="detailSwiper">
			    <div class="swiper-wrapper">
			        <div v-for="item in productDetail.img" class="swiper-slide">
			        	<img :src="item"/>
			        </div>
			    </div>
			    <!-- 分页器 -->
			    <div class="swiper-pagination"></div>
			</div> 
			<div class="productMessage">
				<p v-if="productDetail.state == 1">进行中</p>
				<p v-else-if="productDetail.state == 2">揭晓中</p>
				<p v-else>已揭晓</p>
				<p>{{ productDetail.productName }}<span>【{{ productDetail.periodsNumber }} 期】</span></p>
				<progrees-v class="detailProgrees" :length="(productDetail.dbTotalCount-productDetail.dbSurplusCount)/productDetail.dbTotalCount"></progrees-v>
				<span>总需{{productDetail.dbTotalCount}}人次</span>
				<span>剩余{{productDetail.dbSurplusCount}}人次</span>
			</div>
			<menu-bar :togo="'/me'" :icon="'icon-tuwenxiangqing'" :title="'图文详情'"></menu-bar>
			<menu-bar :togo="'/me'" :icon="'icon-camera'" :title="'晒单分享'"></menu-bar>
			<menu-bar :togo="'/me'" :icon="'icon-currentrecord'" :title="'本期参与记录'"></menu-bar>
			<menu-bar :togo="'/home'" :icon="'icon-xunzhang1'" :title="'往期揭晓'"></menu-bar>
		</div>
		<div class="detailBottomBtn flex-zhong">
			<buy-button @click.native="showBuy" :btntext="'立即购买'"></buy-button>
		</div>
		<shopping v-if="shoppingAlert"></shopping>
	</div>
</template>
<style lang="scss">
	#detail {
		width: 100%;
		height: 100%;
		position: absolute;
		.content{
			width: 100%;
			height: auto;
			overflow: auto;
			position: absolute;
			bottom: 45px;
			top: 0;
			#detailSwiper{
				.swiper-wrapper{
					.swiper-slide{
						text-align: center;
						img{
							width: 50%;
						}
					}
				}
				padding-top: 40px;
				padding-bottom: 40px;
			}
			.detailProgrees{
				width: 90%;
				margin: 0 auto;
			}
		}
		.detailBottomBtn{
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 47px;
			border-top: 1px solid #e3e3e3;
		}
	}
</style>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';
	import progrees from '../components/progrees.vue';//引入进度条
	import menubar from '../components/menubar.vue';//引入菜单跳转
	import buybutton from '../components/buybutton.vue';//引入按钮
	import alertshopping from './shopping.vue';//引入购买弹窗
	import '../plugins/swiper/swiper.min.js';
	import '../plugins/swiper/swiper.min.css';
	export default {
		name: "first",
		data() {
			return {
				swiperImgs: [],
				productId: this.$route.query.id,
				periodId: this.$route.query.periodId,
				productDetail : {},
			}
		},
		computed:{
			shopping(){
		    	return this.$store.state.shopping
		    },
		    shoppingAlert(){
		    	return this.$store.state.shoppingAlert
		    }
		},
		components:{
			"progrees-v" : progrees,
			"menu-bar" : menubar,
			"buy-button" : buybutton,
			"shopping" : alertshopping,
		},
		methods: {
			showBuy(){
				this.$store.commit('goShopping', this.productDetail);
				this.$store.commit('hideShopping', true);
			}
		},
		created() {
			let that = this;
			this.api.getN("product/getProductDetailApi.json",
				{
					"periodId":this.periodId
				}
			).then(function(res){
				that.productDetail = res.data.returnValue;
				console.log(that.productDetail);
			}).then(()=>{
				let mySwiper = new Swiper ('#detailSwiper', {
           			loop: true,
				    autoplay: 2000,
				    autoplayDisableOnInteraction: false,
				    // 如果需要分页器
				    pagination: '.swiper-pagination',
				})  
			}).catch(function(err){
				console.log(err);
			})
		},
		mounted() {
			console.log("mounted")
		}
	}
</script>