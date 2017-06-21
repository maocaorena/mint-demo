<template>
	<div id="secondcomponent" class="wrapper">
		<tabbars-v v-on:clickThis="isThis" :names = '["最新揭晓","我参与"]'></tabbars-v>
		<div class="content">
			<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore :top-method="pullDown" ref="loadmore" @top-status-change="handleTopChange">
					<div slot="top" class="mint-loadmore-top">
				      	<span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'pull' }">↓</span>
						<span v-show="topStatus === 'drop'" :class="{ 'rotate': topStatus === 'drop' }">↑</span>
				      	<span v-show="topStatus === 'loading'">Loading...</span>
				    </div>
					<ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" >
						<li v-for="item of list" class="page-infinite-listitem flex">
							<img class="badge" v-if="item.productType == 3" src="../assets/img/home/ten_s@2x.png">
					        <img class="badge" v-if="item.productType == 4" src="../assets/img/two/two.png">
					        <img class="badge" v-if="item.productType == 5" src="../assets/img/home/five_s@2x.png">
					        <img class="badge" v-if="item.productType == 6" src="../assets/img/home/hundred_s@2x.png">
							<div class="left flex-zhong" @click="goDetail(item)">
								<img v-lazy.container="item.img1" />
							</div>
							<div v-if="item.state === '3'" class="right flex flex-s flex-hc right3">
								<h5 class="ellipsis">{{item.productName}}</h5>
								<p>期号：{{item.periodsNumber}}</p>
								<p>获奖用户：<span class="color3">{{item.winMemberName}}</span></p>
								<p>参与人次：{{item.winMemberBuyCount}}</p>
								<p>幸运号码：<span>{{item.winNumber}}</span></p>
								<p>揭晓时间：{{item.sscOpenTime}}</p>
							</div>
							<div v-if="item.state === '2'" class="right flex flex-s flex-hc right2">
								<h5 class="ellipsis">{{item.productName}}</h5>
								<p>期号：{{item.periodsNumber}}</p>
								<p>
									<i class="iconfont icon-zuixinjiexiao1"></i>
									<span>即将揭晓</span>
								</p>
								<count-Down :time="item.dbOpenTimeLong"></count-Down>
								<p></p>
							</div>
						</li>
					</ul>
					<p v-if="noMore" class="noMore">
						没有更多了
					</p>
				</mt-loadmore>
			</div>
		</div>
		<footer-bar></footer-bar>
	</div>
</template>
<style lang="scss">
	#secondcomponent {
		.content{
			top: 39px;
			bottom: 47px;
			.page-infinite-wrapper{
				width: 100%;
				.page-infinite-list{
					width: 100%;
					.page-infinite-listitem{
						position: relative;
						width: 100%;
						height: 134px;
						border-bottom: 1px solid #eee;
						.badge{
							width:33px;
							position: absolute;
							top: 0;
							left: 5px;
							z-index: 2;
						}
						.left{
							width: 40%;
							padding: 0 8px;
							img{
								width: 112px;
								height: 112px;
							}
							img[lazy=loading] {
								width: 112px;
								height: 112px;
								background: #ccc;
						    }
						}
						.right{
							width: 60%;
							h5{
								width: 95%;
								height: 26px;
								line-height: 26px;
							    font-size: 13px;
								font-weight: 400;
							}
							p{
								width: 100%;
								height: 18px;
								font-size: 12px;
								color: #999;
								span{
									color: #f03d52;
								}
								.color3{
									color: #333333;
								}
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
	import { Toast } from 'mint-ui';
	import footerbar from './tab.vue';//引入底部栏
	import countDown from '../components/countdown.vue';//引入倒计时组件
	import tabbars from '../components/tabbars.vue';//引入选项卡组件
	import { Storage } from '../assets/js/storage.js';//引入storage操作方法

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
				noMore: false,
				topStatus: '',
			}
		},
		components: {
			"footer-bar" : footerbar,
			"count-Down" : countDown,
			"tabbars-v" : tabbars
		},
		methods:{
			getList(page){
				Indicator.open();
				let that = this;
				this.loading = true;
	        	//获取信息列表
	        	setTimeout(() => {
			        this.api.getLastAnnounList(page,6,
						function ( data ) {
							let res = data.data;
							if(page === 1){
								that.list = [];
							};
							for( let v = 0; v < res.returnValue.length; v++ ) {
								that.list.push( res.returnValue[v] );
							};
							if( res.returnValue.length == 0 ){
								that.loading = true;
								that.noMore = true;
							}else{
								that.loading = false;
							};
							that.topStatus = '';
							Indicator.close();
							that.$refs.loadmore.onTopLoaded();
						}
					);
				}, 100);
			},
			loadMore(){
				this.getList(this.page);
				this.page++;
			},
			pullDown(){
				this.page = 1;
				this.getList(this.page);
			},
			handleTopChange(status) {
		        this.topStatus = status;
				console.log(status);
		    },
			goDetail(item){
				if(item.state === "2"){
					Storage.setItem('thisOpenTime',item.dbOpenTimeLong);
				};
				this.$router.push({ path: '/tab/home/productDetail', query: { id: item.productId ,periodId: item.periodsId}});
			},
			isThis(index){
				console.log("fu",index);
			}
		},
		beforeMount(){

		},
		created(){

		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>
