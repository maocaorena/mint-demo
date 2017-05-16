<template>
	<router-link class="menubar flex-zhong" :to="togo">
		<i class="iconfont" :class="icon"></i>
		<span>{{title}}</span>
		<div class="flex flex-sc">
			<i class="iconfont icon-jiantou"></i>
		</div>
	</router-link>
</template>
<style lang="scss">
	.menubar{
		width: 100%;
		height: 45px;
		position: relative;
		border-bottom: 1px solid #eee;
		i:nth-child(1){
			width: 10%;
			color: #bcbcbc;
			font-size: 24px;
		}
		span{
			display: inline-block;
			width: 80%;

		}
		.flex{
			height: 100%;
			position: absolute;
			right: 15px;
			color: #bcbcbc;
			.iconfont{
				font-size: 16px;
			}
		}
	}
</style>
<script type="text/javascript">
	export default {
		props: [
            'togo',
            'icon',
            'title'
        ]
	}
</script>
