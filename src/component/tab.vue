<template>
	<div class="tab">
		<div class="flex footerBar">
			<router-link class="footerBarItem flex flex-s flex-sc" :class="{ footerBarItem1: tabState == 1 }" to="/tab/home">
				<img v-if="tabState == 1" src="../assets/img/tab/duobao-on.png"/>
				<img v-else src="../assets/img/tab/duobao-off.png"/>
				<span>全民夺宝</span>
			</router-link>
			<router-link class="footerBarItem flex flex-s flex-sc" :class="{ footerBarItem1: tabState == 2 }" to="/tab/latestAnnounced">
				<img v-if="tabState == 2" src="../assets/img/tab/lastKnow-on.png"/>
				<img v-else src="../assets/img/tab/lastKnow-off.png"/>
				<span>最新揭晓</span>
			</router-link>
			<router-link class="footerBarItem flex flex-s flex-sc" :class="{ footerBarItem1: tabState == 3 }" to="/tab/find">
				<img v-if="tabState == 3" src="../assets/img/tab/find-on.png"/>
				<img v-else src="../assets/img/tab/find-off.png"/>
				<span>发现</span>
			</router-link>
			<router-link class="footerBarItem flex flex-s flex-sc" :class="{ footerBarItem1: tabState == 4 }" to="/tab/me">
				<img v-if="tabState == 4" src="../assets/img/tab/myInfo-on.png"/>
				<img v-else src="../assets/img/tab/myInfo-off.png"/>
				<span>我的</span>
			</router-link>
		</div>
	</div>
</template>
<script>
	export default {
		name: "footer",
		data() {
			return {

			}
		},
		computed:{
			tabState(){
				return this.$store.state.footerbarState
			}
		},
		created(){
			let thisPath = this.$route.fullPath;
			let isFirst = thisPath.indexOf("home");
			let isSecond = thisPath.indexOf("latestAnnounced");
			let isFind = thisPath.indexOf("find");
			let isMe = thisPath.indexOf("me");
			if(isFirst > 0){
				this.$store.commit('selectTab', 1);
			}else if(isSecond > 0){
				this.$store.commit('selectTab', 2);
			}else if(isFind > 0){
				this.$store.commit('selectTab', 3);
			}else if(isMe > 0){
				this.$store.commit('selectTab', 4);
			};

		},
		methods:{
			tabSelect(){

				console.log("aaab",this.tabState);
			}
		}
	}
</script>
<style lang="scss">
	.tab{
		width: 100%;
	    height: 47px;
		position: absolute;
	    bottom: 0;
	    z-index: 99;
		.footerBar{
			width: 100%;
		    height: 47px;
		    background: #f5f5f5;
			.footerBarItem{
				width: 25%;
				text-align: center;
				img{
					width: 30px;
				}
				span{
					display: block;
					font-size: 12px;
					color: #444;
				}
			}
			.footerBarItem1{
				span{
					color: #f53952;
				}
			}
		}
	}
</style>
