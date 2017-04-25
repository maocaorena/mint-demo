<template>
	<div id="app">
		<router-view></router-view>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
	import footerbar from './component/tab.vue';
	export default {
		name: 'App',
		data() {
			return {
				
			}
		},
		components: {
			"footer-bar" : footerbar
		}
	}
</script>

<style lang="scss">

</style>