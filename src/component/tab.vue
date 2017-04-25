<template>
	<div class="tab">
		<div class="flex footerBar">
			<router-link class="flex flex-s flex-sc" to="/first">
				<img src="src/assets/img/discover/home_sorts@2x.png"/>
				<span>夺宝a</span>
			</router-link>
			<router-link class="flex flex-s flex-sc" to="/second">
				<img src="src/assets/img/discover/home_sorts@2x.png"/>
				<span>最新揭晓</span>
			</router-link>
			<router-link class="flex flex-s flex-sc" to="/find">
				<img src="src/assets/img/discover/home_sorts@2x.png"/>
				<span>发现</span>
			</router-link>
			<router-link class="flex flex-s flex-sc" to="/me">
				<img src="src/assets/img/discover/home_sorts@2x.png"/>
				<span>我的</span>
			</router-link>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>
<style lang="scss">
	.tab{
		width: 100%;
		height: 47px;
		.footerBar{
			width: 100%;
			padding-top: 5px;
			position: fixed;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    z-index: 9999;
		    height: 45px;
		    background: #f5f5f5;
			.flex{
				width: 25%;
				text-align: center;
				img{
					width: 25%;
				}
				span{
					display: block;
					font-size: 12px;
				}
			}
			
		}
	}
</style>
