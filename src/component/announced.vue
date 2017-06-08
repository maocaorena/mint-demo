<template>
    <div id="announced">
        <div class="content">
            <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <ul class="two-goodslist page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
                    <li class="page-infinite-listitem" v-for="item in announcedList">
                        <h4 class="ann-top">
                            【{{item.periodsNumber}}期】 揭晓时间：{{item.dbOpenTime}}
                        </h4>
                        <div class="ann-bottom flex">
                            <div class="pic">
                                <img :src="item.memberFace" alt="">
                            </div>
                            <div class="ann-message">
                                <p class="ellipsis">获奖者：{{item.winMemberName}}</p>
                                <p class="ellipsis">用户ID：{{item.winMemberId}}</p>
                                <p class="ellipsis">本期参与：<span>{{item.winMemberBuyCount}}</span></p>
                                <p class="ellipsis">幸运号码：<span>{{item.winNumber}}</span></p>
                            </div>
                        </div>
                    </li>
                    <li style="clear:both;"></li>
                </ul>
                <p v-show="noMore" class="noMore">没有更多啦！</p>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {
                productId: this.$route.query.goodsId,
                page : 1,
                loading: false,
                wrapperHeight: 0,
                noMore: false,
                loadMoreSwitch: true,
                announcedList: []
            }
        },
        methods:{
            loadMore(){
                this.loading = true;
                let that = this;
                setTimeout(() => {
                    this.api.getAnnouncedList(this.page,6,this.productId,function(data) {
                        let res = data.data;
                        for(let v = 0; v < res.returnValue.length; v++) {
                            that.announcedList.push(res.returnValue[v]);
                        };
                        if(res.returnValue.length < 6){
                            that.loading = true;
                            that.noMore = true;
                        }else{
                            that.loading = false;
                        };
                        that.page++;
                    });
                }, 100);
            }
        }
    }
</script>
<style lang="scss">
    #announced{
        .content{
            top: 0;
            bottom: 0;
        }
        .page-infinite-listitem{
            width: 100%;
            height: 163px;
            border-bottom: 8px solid #f2f2f2;
            .ann-top{
                padding: 16px;
                height: 50px;
                font-size: 12px;
                color: #666666;
                font-weight: 400;
            }
            .ann-bottom{
                padding: 10px;
                width: 100%;
                height: 105px;
                overflow: hidden;
                border-top: 1px solid #f2f2f2;
                background: #fff;
                .pic{
                    overflow: hidden;
                    width: 30%;
                    height: 100%;
                    img{
                        width: 60px;
                        height: 60px;
                        border: 4px solid #f4f4f4;
                        border-radius: 50%;
                    }
                }
                .ann-message{
                    width: 70%;
                    height: 100%;
                    p{
                        width: 90%;
                        height: 20px;
                        color: #999999;
                        font-size: 12px;
                        span{
                            color: #f43851;
                        }
                    }
                }
            }
        }
    }
</style>
