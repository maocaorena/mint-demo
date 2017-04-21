<template>
	<div id="app">
		<section><router-view></router-view></section>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
	import footerbar from './component/tab.vue';
	export default {
		name: 'App',
		data() {
			return {
				selected: 'home'
			}
		},
		components: {
			"footer-bar" : footerbar
		}
	}
</script>

<style lang="scss">
	#app{
		height: 99%;
		width: 100%;
		position: relative;
		section{
			height: 100%;
			width: 100%;
			padding-bottom: 45px;
			overflow: auto;
			img{
				width: 100%;
			}
		}
	}
</style>