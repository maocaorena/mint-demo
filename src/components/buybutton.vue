<template>
	<button class="buybutton">
		<slot></slot>
	</button>
</template>
<style lang="scss">
	.buybutton{
		margin: 0 auto;
		display: block;
		width: 95%;
		height: 33px;
		background: #f93069;
		font-size: 16px;
		line-height: 30px;
		border-radius: 5px;
		color: #fff;
	}
</style>
