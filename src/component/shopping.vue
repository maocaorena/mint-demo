<template>
	<div id="alertshopping">
		<div class="shop">
			<h1 class="ellipsis" @click="hide()" >shop{{shopping.productName}}</h1>
			<span @click="changeBuynum(1)">-</span>
			<input type="number" name="" id="" @input="changeBuynum(3)" v-model="buyNum" />
			<span @click="changeBuynum(2)">+</span>
			<button @click="goPay()">去付账</button>
		</div>
	</div>
</template>
<style lang="scss">
	#alertshopping{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		margin: auto;
		width: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 9999;
		.ellipsis{
			width: 100%;
		}
		.shop{
			text-align: center;
			width: 100%;
			height: 260px;
			background: #fff;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 999;
			input{
				border: 1px solid #333;
				margin: 0 10px;
				padding: 0 10px;
			}
		}
	}
</style>
<script type="text/javascript">
	import store from '../store/';
	export default {
		data () {
			return {
				buyNum : 1
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
			},
			changeBuynum(type){
				if(type == "1" ){
					if(this.buyNum > 1){
						this.buyNum--;
					};
				}else if( type == "2" ){
					if(this.buyNum < this.shopping.dbSurplusCount){
						this.buyNum++;
					};
				}else if( type == "3"){
					console.log(this.buyNum);
					if(this.buyNum > this.shopping.dbSurplusCount){
						this.buyNum =this.shopping.dbSurplusCount;
					}else if(this.buyNum < 1 && this.buyNum != ''){
						this.buyNum = 1;
					};
				}
			},
			goPay(){
				console.log(this.buyNum);
				this.hide(); 
			}
		},
		mounted(){
			
		}
	}
</script>