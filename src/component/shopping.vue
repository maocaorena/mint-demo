<template>
	<div id="alertshopping">
		<h1 @click="show()" >shop</h1>
		<mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
			<h1 v-if="popupVisible3 == true">shop</h1>
			<mt-button size="large" type="primary">关闭 popup</mt-button>
		</mt-popup>
	</div>
</template>
<style lang="scss">
	
</style>
<script type="text/javascript">
	export default {
		data () {
			return {
				item: null,
				popupVisible3: false,
			}
		},
		methods:{
			show (){
				console.log("qqqqqq")
				this.popupVisible3 = !this.popupVisible3;
			}
		}
	}
</script>