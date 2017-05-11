<template>
	<div id="progrees">
		<mt-progress :value="length*100" :bar-height="3"></mt-progress>
	</div>
</template>
<style lang="scss">
	#progrees{
		.mt-progress{
			height: 5px;
			.mt-progress-content{
				height: 5px;
				.mt-progress-progress{
					background-color: #ffc000;
					border-radius: 3px;
				}
				.mt-progress-runway{
					border-radius: 5px;
				}
			}
		}
	}
</style>
<script type="text/javascript">
	import { Progress } from 'mint-ui';
	export default {
		props: [
            'length'
        ]
	}
</script>