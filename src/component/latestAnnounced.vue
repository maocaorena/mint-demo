<template>
	<div id="secondcomponent">
		<header>22222222222222</header>
		<div class="content">
			<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<ul class="page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
					<li v-for="item in list" class="page-infinite-listitem flex">
						<div class="left flex-zhong">
							<router-link :to="{ path: '/tab/home/productDetail', query: { id: item.productId ,periodId: item.periodsId}}">
								<img v-lazy.container="item.img1" />
							</router-link>
						</div>
						<div class="right flex flex-s flex-hc">
							<h5>{{item.productName}}</h5>
							<p>期号：{{item.periodsNumber}}</p>
							<p>获奖用户：{{item.winMemberName}}</p>
							<p>参与人次：{{item.winMemberBuyCount}}</p>
							<p>幸运号码：{{item.winNumber}}</p>
							<p>揭晓时间：{{item.sscOpenTime}}</p>
						</div>
					</li>
				</ul>
				<p v-if="noMore" class="noMore">
					没有更多了
				</p>
			</div>
		</div>
		<footer-bar></footer-bar>
	</div>
</template>
<style lang="scss">
	#secondcomponent {
		width: 100%;
		height: 100%;
		position: absolute;
		header{
			width: 100%;
			height: 45px;
			position: absolute;
			top: 0;
			left: 0;
			background: #fff;
			border-bottom: 1px solid #eee;
		}
		.content{
			width: 100%;
			height: auto;
			overflow: auto;
			position: absolute;
			top: 45px;
			bottom: 45px;
			.page-infinite-wrapper{
				width: 100%;
				.page-infinite-list{
					width: 100%;
					.page-infinite-listitem{
						width: 100%;
						height: 134px;
						border-bottom: 1px solid #eee;
						.left{
							width: 40%;
							padding: 0 8px;
							img{
								width: 112px;
								height: 112px;
							}
						}
						.right{
							width: 70%;
							p{
								width: 100%;
								font-size: 12px;
							}
						}
					}
				}
			}
		}
	}
</style>
<script>
	import { Indicator } from 'mint-ui';
	import {Toast} from 'mint-ui';
	import footerbar from './tab.vue';
	import '../plugins/swiper/swiper.min.js';
	import '../plugins/swiper/swiper.min.css';
	
	export default {
		name: "secondcomponent",
		data() {
			return {
				author: "微信公众号 jinkey-love",
				articles: [],
				list: [],
    			busy: false,
    			page: 1,
				loading: false,
				wrapperHeight: 0,
				noMore: false
			}
		},
		components: {
			"footer-bar" : footerbar
		},
		methods:{
			getList(){
				Indicator.open({
		            text: '加载中...',
		            spinnerType: 'fading-circle'
		        });
				let that = this;
				this.loading = true;
	        	//获取信息列表
	        	setTimeout(() => {
			        this.api.getN("period/getPeroidListByLastAnnounApi.json",
						{
							"page_index" : that.page,
							"page_size"  : 6
						}
					).then(function(res){
						for(let v = 0; v < res.data.returnValue.length; v++) {
							that.list.push(res.data.returnValue[v]);
						};
						if(res.data.returnValue.length==0){
							that.loading = true;
							that.noMore = true;
						}else{
							that.loading = false;
						};
						that.page++;
						Indicator.close();
					}).catch(function(err){
						Indicator.close();
					});
				}, 500);
			}
		},
		beforeMount(){
			
		},
		created(){
			this.getList();
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>