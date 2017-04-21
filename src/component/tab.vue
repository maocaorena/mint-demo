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
				selected: 'home'

			}
		}
	}
</script>
<style lang="scss">
	.tab{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 45px;
		background: #fefefe;
		.footerBar{
			width: 100%;
			height: 45px;
			.flex{
				width: 25%;
				text-align: center;
				img{
					width: 30%;
				}
				span{
					display: block;
				}
			}
			
		}
	}
</style>
