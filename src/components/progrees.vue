<template>
	<mt-progress :value="length*100" :bar-height="4"></mt-progress>
</template>
<style lang="scss">
		.mt-progress{
			height: 5px!important;
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

</style>
<script type="text/javascript">
	import { Progress } from 'mint-ui';
	export default {
		props: [
            'length'
        ]
	}
</script>
