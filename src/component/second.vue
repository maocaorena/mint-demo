<template>
	<div id="secondcomponent">
		<p v-for="item in data">
			<img style="width: 100%;" v-bind:src="item.adImgUrl"/>
		</p>
	</div>
</template>
<script>
	import API from '../api/API';
	const api = new API();
	import { Indicator } from 'mint-ui';
	import {Toast} from 'mint-ui';
	export default {
		name: "secondcomponent",
		beforeMount(){
			Indicator.open({
	            text: '加载中...',
	            spinnerType: 'fading-circle'
	        });
	        let that = this;
	        //获取信息列表
	        let response = api.getN("adv/advApi.json",{"appKey":"1111"});

	        response.then(function(res){
	        		that.data = res.data.returnValue;
	        		Indicator.close();
	            })
	            .catch(function(err){
	                console.log(err);
	            });
		},
		data() {
			return {
				author: "微信公众号 jinkey-love",
				articles: [],
				data: [],
    			busy: false
			}
		},
		mounted: function() {
			
		}
	}
</script>

<style lang="scss">
	#secondcomponent {
		transition: all .3s ease;
		padding-bottom: 44px;
	}
</style>