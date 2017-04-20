<template>
	<div id="app">
		<router-view></router-view>
		<mt-tabbar v-model="selected">
			<mt-tab-item id="home">
			    <mt-cell title="夺宝" to="/first">
			    	<img style="width: 100%;" slot="icon" src="src/assets/img/ico-n.png">
				</mt-cell>
			</mt-tab-item>
			<mt-tab-item id="new">
			    <mt-cell title="最新揭晓" to="/second">
			    	<img style="width: 100%;" slot="icon" src="src/assets/img/ico-n.png">
				</mt-cell>
			</mt-tab-item>
			<mt-tab-item id="发现">
			    <mt-cell title="发现" to="/find">
			    	<img style="width: 100%;" slot="icon" src="src/assets/img/ico-n.png">
				</mt-cell>
			</mt-tab-item>
			<mt-tab-item id="我的">
			    <mt-cell title="我的" to="/me">
			    	<img style="width: 100%;" slot="icon" src="src/assets/img/ico-n.png">
				</mt-cell>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
	export default {
		name: 'App',
		data() {
			return {
				selected: 'home'
			}
		}
	}
</script>

<style lang="scss">
	#app{
		.mint-cell{
			background: none;
		}
	}
</style>