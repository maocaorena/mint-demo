<template>
	<div class="goodsItem">
        <router-link class="goodsItem-img" :to="{ path: '/tab/home/productDetail', query: { id: goodsItemMessage.productId ,periodId: goodsItemMessage.periodsId}}">
            <img :src="goodsItemMessage.image1" alt="">
        </router-link>
        <p  class="goodsItem-goodsName">
            {{goodsItemMessage.productName}}
        </p>
        <div class="goodsItem-progress flex">
            <div class="left">
                <progrees-v class="goodsItem-detailProgrees" :length="(goodsItemMessage.dbTotalCount-goodsItemMessage.dbSurplusCount)/goodsItemMessage.dbTotalCount"></progrees-v>
                <div class="goodsItem-num flex">
					<p class="goodsItem-all flex flex-s">
                        <span>{{goodsItemMessage.dbTotalCount}}</span>
                        <span>总需</span>
                    </p>
					<p class="goodsItem-surplus flex flex-s">
                        <span>{{goodsItemMessage.dbSurplusCount}}</span>
                        <span>剩余</span>
                    </p>
				</div>
            </div>
            <div class="right flex-zhong">
                <button  @click="buy(goodsItemMessage)">夺宝</button>
            </div>
        </div>
	</div>
</template>
<style lang="scss">
    .goodsItem{
        width: 100%;
        height: 240px;
        color: #fff;
        background: #fff;
        border-radius: 3px;
        padding: 0 3px;
    }
    .goodsItem-img{
        display: block;
        padding: 5px 0 10px;
        width: 100%;
        text-align: center;
        img{
            width: 135px;
        }
    }
    .goodsItem-goodsName{
        color: #50575d;
        font-size: 13px;
        text-align: left;
    }
    .goodsItem-progress{
        width: 100%;
        span{
            color: #999;
            font-size: 13px;
        }
        .left{
            width: 66%;
        }
        .goodsItem-detailProgrees{
            margin: 5px 0;
        }
        .goodsItem-num{
            p{
                width: 50%;
            }
        }
        .goodsItem-all{
            text-align: left;
        }
        .goodsItem-surplus {
            text-align: right;
        }
        .right{
            width: 34%;
            button{
                width: 35px;
                height: 35px;
                border: 1px solid #f93069;
                border-radius: 50%;
                color: #f93069;
                background: #fff;
                font-size: 13px;
            }
        }
    }
</style>
<script type="text/javascript">
    import progrees from './progrees.vue';//引入进度条
	export default {
		props: [
            'goodsMessage',
            'from'
        ],
        data(){
            return {
                goodsItemMessage : this.goodsMessage,
            }
        },
        components:{
            "progrees-v" : progrees
        },
        methods:{
            buy(goodsItemMessage){
                let from = this.from;
                this.$store.commit('goShopping', goodsItemMessage);
				this.$store.commit('showShopping', from);
            }
        },
        created(){

        }
	}
</script>
