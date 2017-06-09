<!--
	<tabbars-v v-on:clickThis="isThis" :names = '["最新揭晓","我参与"]' :tostatus = 'status' :showTop = '"y"'></tabbars-v>
	isThis 父组件回调函数名字，传出点击按钮的index；
	name是数组，tab栏内按钮名称；
	tostatus 上下箭头对应的状态；
	showTop = '"y"'  是否显示上下箭头，不写默认不显示；
 -->
<template>
	<div class="tabbars flex">
        <div class="tabbars-item flex-zhong" v-on:click="clickThis(index)" v-for="(item, index) of itemName">
            <button :class="{redborder : selectthis == index}">{{item}}</button>
            <span  v-if="index === 1 && showTop === 'y'" :class="{upOrDown : tostatus === 'surplusasc',upOrDown1 : tostatus === 'surplusdesc'}"></span>
        </div>
	</div>
</template>
<style lang="scss">
    .tabbars{
        width: 100%;
        height: 39px;
        border-bottom: 1px solid #e2e2e2;
        span{
            position: absolute;
            left: 60%;
            display: block;
            width: 21px;
            height: 24px;
            background: url(../assets/img/home/icons.png) no-repeat;
            background-position: -49px 0;
        }
        .upOrDown{
            background-position-x: -91px;
        }
        .upOrDown1{
            background-position-x: -70px;
        }
    }
    .tabbars-item{
        position: relative;
        width: 20%;
        height: 100%;
        flex: 1;
    }
    .tabbars button{
        display: block;
        width: 78%;
        height: 100%;
        background: #fff;
        border-bottom: 2px solid #fff;
    }
    .tabbars .redborder{
        border-color: #f93069;
    }
</style>
<script type="text/javascript">
	export default {
		props: [
            "names",
            "tostatus",
            "showTop"
        ],
        data(){
            return{
                itemNum : this.num,
                itemName : this.names,
                selectthis : 0
            }
        },
        components:{

        },
        methods:{
            clickThis(index){
                this.selectthis = index;
                this.$emit('clickThis',index);
            }
        },
        created(){

        }
	}
</script>
