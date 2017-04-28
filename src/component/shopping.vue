<template>
	<div id="alertshopping">
		<h1 class="ellipsis" @click="hide()" >shop{{shopping.productName}}</h1>
	</div>
</template>
<style lang="scss">
	#alertshopping{
		width: 100%;
		.ellipsis{
			width: 100%;
		}
	}
</style>
<script type="text/javascript">
	import store from '../store/';
	export default {
		data () {
			return {
				
			}
		},
		computed: {
		    shopping () {
		      	return store.state.shopping
		    },
		},
		props: ['message'],
		methods:{
			hide(){
				store.commit('hideShopping', false);
			}
		},
		mounted(){
			
		}
	}
</script>