<template>
	<div class="lucknumalert flex-zhong">
		<div class="lucknumalert-in">
			<div class="tit">
				<h5 class="ellipsis">{{message.productName}}</h5>
				<p>商品期号：{{message.periodsNumber}}期</p>
				<p>参与<strong class="red">{{message.buyCount}}</strong>人次，夺宝号码：</p>
			</div>
			<div class="container">
				<span v-for="num of message.nums">{{num}}</span>
			</div>
			<buy-button @click.native="close" >确定</buy-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import buybutton from "./buybutton.vue";
	export default{
		props: [
			"message"
		],
		components:{
			"buy-button":buybutton
		},
		methods:{
			close(){
				this.$emit('close');
			}
		}
		
	}
</script>
<style lang="scss">
	.lucknumalert{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		.tit{
			padding: 0 15px;
    		color: #b7b7b7;
    		font-size: 12px;
    		h5,p{
    			width: 100%;
    			padding: 8px 0;
    		}
			.red{
				color: #f43a52;
			}
		}
		.lucknumalert-in{
			width: 75%;
			padding: 10px 0;
			background: #fff;
			border-radius: 10px;
			.container{
				margin-bottom: 10px;
				padding: 0 15px;
				width: 100%;
				height: 150px;
				overflow: auto;
				border-top: 1px solid #f2f2f2;
				font-size: 13px;
				span{
					display: block;
					float: left;
					width: 33%;
					height: 32px;
					line-height: 32px;
					text-align: center;
				}
			}
		}
	}
</style>
