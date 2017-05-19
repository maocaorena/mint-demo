<template>
	<button class="buybutton">
		{{btntext}}
	</button>
</template>
<style lang="scss">
	.buybutton{
		display: block;
		width: 95%;
		height: 33px;
		background: #f93069;
		text-align: center;
		font-size: 16px;
		line-height: 30px;
		border-radius: 5px;
		color: #fff;
	}
</style>
<script type="text/javascript">
	import { Progress } from 'mint-ui';
	export default {
		props: [
            'btntext'
        ]
	}
</script>
