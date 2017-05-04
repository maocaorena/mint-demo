<template>
	<div id="secondcomponent">
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div v-for="item in data" class="swiper-slide">
		        	<img style="width: 100%;" v-bind:src="item.adImgUrl"/>
		        </div>
		    </div>
		    <!-- 如果需要分页器 -->
		    <div class="swiper-pagination"></div>
		</div>
		<p v-for="item in data">
			<img style="width: 100%;" v-bind:src="item.adImgUrl"/>
		</p>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	import {Toast} from 'mint-ui';
	import footerbar from './tab.vue';
	import '../plugins/swiper/swiper.min.js';
	import '../plugins/swiper/swiper.min.css';
	
	export default {
		name: "secondcomponent",
		data() {
			return {
				author: "微信公众号 jinkey-love",
				articles: [],
				data: [],
    			busy: false
			}
		},
		components: {
			"footer-bar" : footerbar
		},
		beforeMount(){
			Indicator.open({
	            text: '加载中...',
	            spinnerType: 'fading-circle'
	        });
	        let that = this;
	        //获取信息列表
	        this.axios.get("adv/advApi.json",{
		        	params:{
		        		"appKey":"1111"
		        	}
	        	}).then(function(res){
	        		that.data = res.data.returnValue;
	        		Indicator.close();
	           	}).then(function(){
	           		var mySwiper = new Swiper ('.swiper-container', {
				    loop: true,
				    
				    // 如果需要分页器
				    pagination: '.swiper-pagination',
				  })        
	           	}).catch(function(err){
	                console.log(err);
	            });
		},
		mounted: function() {
			
		}
	}
</script>

<style lang="scss">
	#secondcomponent {
		padding-bottom: 44px;
	}
</style>