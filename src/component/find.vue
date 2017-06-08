<template>
	<div id="find" class="wrapper">
		<div class="content">
			<div class="find-top flex-zhong">
				<!--晒单-->
				<router-link class="find-top-in" to="/tab/home/single">
					<img src="../assets/img/discover/find_share@2x.png" alt="" />
				</router-link>
				<div class="find-top-mid"></div>
				<!--开奖规则-->
				<router-link class="find-top-in" to="/tab/home/single">
					<img src="../assets/img/discover/find_guide@2x.png" alt="" />
				</router-link>
			</div>
			<div class="find-tit">
				<i class="iconfont icon-hotactivities"></i><span>热门活动</span>
			</div>
			<div class="just-list">
				<!--新手特权-->
				<router-link class="flex item" to="/tab/home/two">
					<div class="left flex-zhong">
			        	<img src="../assets/img/discover/find_new@2x.png" alt="" />
			        </div>
					<div class="right flex flex-s flex-hc">
						<h2>新手特权</h2>
						<p>首单送188元大红包</p>
					</div>
				</router-link>
				<!--双人夺宝-->
				<router-link class="flex item" to="/tab/home/two">
					<div class="left flex-zhong">
			          	<img src="../assets/img/discover/find_pk@2x.png" alt="" />
			        </div>
					<div class="right flex flex-s flex-hc">
						<h2>双人夺宝</h2>
						<p>50%中奖概率，回血专区</p>
					</div>
				</router-link>
			</div>
		</div>
		<footer-bar></footer-bar>
	</div>
</template>
<style lang="scss">
	#find{
		.content{
            top: 0;
            bottom: 47px;
			.find-top{
		        width: 100%;
		        padding: 10px;
		        background: #fff;
		        border-bottom: 10px solid #f2f2f2;
		        .find-top-in{
					display: block;
		            width: 49%;
		            padding: 0;
		            img{
		                width: 100%;
		                vertical-align: bottom;
		            }
		        }
		        .find-top-mid{
		            width: 2%;
		            height: 100%;
		        }
		    }
		    .find-tit{
		        width: 100%;
		        height: 38px;
		        background: #fff;
		        border-bottom: 1px solid #f2f2f2;
		        line-height: 38px;
		        padding-left: 15px;
		        color: #666666;
		        span{
		            margin-left: 7px;
		        }
		    }
		    .just-list{
		        margin-bottom: 15px;
		        border-bottom: 10px solid #f2f2f2;
		        padding-bottom: 0;
		        .item {
					width: 100%;
					height: 81px;
		            margin: 0;
					border-bottom: 1px solid #e5e5e5;
		            .left {
		                font-size: 26px;
		                width: 103px;
		                height: 100%;
		                img{
		                    height:70px;
		                    width: 70px;
		                }
		            }
					.right{
						h2{
							font-size: 16px;
							margin-bottom: 9px;
							color: #333;
							font-weight: 400;
						}
						p{
							color: #999;
							font-size: 13px;
						}
					}
		        }
		    }
		}
	}
</style>

<script type="text/babel">
	import footerbar from './tab.vue';//引入底部栏
	export default {
	    data() {
		    return {

		    };
	    },
		components: {
			"footer-bar" : footerbar
		},
	    methods: {

	    },
	    mounted() {

	    }
	};
</script>
