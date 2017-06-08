<template>
    <div id="two" class="wrapper">
        <div class="two-con content">
            <div class="two-con-img">
                <img src="../assets/img/two/tit.png" alt="">
            </div>
            <p class="two-rule">
      			双人夺宝由2位玩家分别购买商品的一半总需价格（支付成功后可在夺宝记录中查询夺宝详情），获得大或小数字号码段，根据规则计算出幸运号码。
            </p>
            <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <ul class="two-goodslist page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
                    <li class="page-infinite-listitem" v-for="goodsItem in goodsList">
                        <goods-item :goodsMessage = "goodsItem" :from = "'two'"></goods-item>
                    </li>
                    <li style="clear:both;"></li>
                </ul>

            </div>
        </div>
        <shopping v-if="shoppingAlert === 'two'"></shopping>
    </div>
</template>
<script type="text/javascript">
    import goodsItem from '../components/goodsItem.vue';//引入单个商品样式
    import alertshopping from '../component/shopping.vue';//引入购买弹窗
    export default{
        data(){
            return{
                goodsList : [],
                page : 1,
                loading: false,
				wrapperHeight: 0,
				loadMoreSwitch: true,
            }
        },
        components:{
            "goods-item" : goodsItem,
            "shopping" : alertshopping
        },
        computed:{
            shoppingAlert(){
		    	return this.$store.state.shoppingAlert
		    }
        },
        methods:{
            loadMore(){
                this.loading = true;
                let that = this;
                setTimeout(() => {
                    this.api.getActiveProductList({
                        "appKey" : "oWc0jGVZn9Aqo5uXN4duvwbQqHQ1Gamk",
                        "productType" : 4,
                        "page_index" : that.page,
                        "page_size" : 6
                    },function(res) {
                        for(let v = 0; v < res.data.returnValue.length; v++) {
                            that.goodsList.push(res.data.returnValue[v]);
                        };
                        if(res.data.returnValue.length < 6){
                            that.loading = true;
                            that.noMore = true;
                        }else{
                            that.loading = false;
                        };
                        that.page++;
                    });
                }, 100);
            }
        },
        created(){
            // this.getTwoGoodsList();
        }
    }
</script>
<style lang="scss">
    #two{
        .two-con{
            top: 0;
            bottom: 0;
            background: #0032a1;
        }
        .two-con-img{
            width: 100%;
            img{
                width: 100%;
                vertical-align: bottom;
            }
        }
        .two-rule{
            padding: 15px;
            color: #c2d8ff;
            font-size: 12px;
        }
        .two-goodslist{
            width: 100%;
            padding: 1px 3px;
            .page-infinite-listitem{
                width: 50%;
                float: left;
                padding: 0 3px 5px 3px;
            }
        }
    }
</style>
