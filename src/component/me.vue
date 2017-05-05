<template>
	<div id="first">
		<h1 @click="dianwo()">me</h1>
		<p>by {{count}}</p>
		<footer-bar></footer-bar>
	</div>
</template>
<script type="text/javascript">
	import store from '../store/';
	import footerbar from './tab.vue';
	
	export default {
		name: "me",
		data () {
			return {
				name : "damaoa",
				swiperImgs: []
			}
		},
		components: {
			"footer-bar" : footerbar
		},
		computed: {
		    count () {
		      	return store.state.count
		    }
		},
		methods:{
			dianwo(){
				console.log("wo");
				store.commit('getData', "10");
				console.log(this.count);
			}
		},
		created(){
			
		}
	}
</script>