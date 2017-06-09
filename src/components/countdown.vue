<!-- 倒计时组件，只需要传入开奖时间 -->
<!-- 用法  <count-Down :time="productDetail.dbOpenTime"></count-Down> -->
<template>
	<p class="count-down">
	    <slot></slot>{{outTime}}
	</p>
</template>
<style lang="scss">
	.count-down{
		width: 50%;

	}
</style>
<script type="text/javascript">
	export default {
		props: [
            'time'
        ],
        data(){
            return {
                startTime : this.time,
                outTime : null,
                timer : null
            }
        },
        methods:{
            numDown(){
                let endTime = parseInt(this.startTime);
                let nowTime = Date.now();
                let t = endTime - nowTime;
                if (t > 0){
                    let m = parseInt(Math.floor(t/1000/60));
                    let s = parseInt(Math.floor(t/1000%60));
                    let ms = Math.floor((t/1000 - Math.floor(t/1000))*100);
                    this.outTime = pad(m,2) + ":" + pad(s,2) + ":" + pad(ms,2);
                }else{
                    this.outTime = "揭晓中";
                };
                //占位
                function pad(num, n) {
                    var len = num.toString().length;
                    while(len < n) {
                        num = "0" + num;
                        len++;
                    };
                    return num;
                }
            }
        },
        mounted(){
            this.timer = setInterval(() => {
                this.numDown();
            }, 50)
        },
        beforeDestroy(){
            window.clearInterval(this.timer);
        }
	}
</script>
