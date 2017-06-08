<template>
    <div id="historyRecords" class="wrapper">
        <div class="historyRecords-tit">
            本期参与记录
        </div>
        <div class="content">
            <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <ul class="two-goodslist page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
                    <li class="page-infinite-listitem flex" v-for="item in storyRecordsList">
                        <div class="hr-left">
                            <img :src="item.memberFace" alt="">
                        </div>
                        <div class="hr-middle">
                            <p class="ellipsis"><span>{{item.nickName}}</span>（{{item.userIpInfo}}）</p>
                            <p class="ellipsis">{{item.created}}</p>
                        </div>
                        <div class="hr-right">
                            夺取<span>{{item.buyCount}}</span>人次
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
				periodId: this.$route.query.periodId,
                page : 1,
                loading: false,
				wrapperHeight: 0,
                noMore: false,
				loadMoreSwitch: true,
                storyRecordsList: []
            }
        },
        methods:{
            loadMore(){
                // getHistoryRecordsList
                this.loading = true;
                let that = this;
                setTimeout(() => {
                    this.api.getHistoryRecordsList(this.page,6,this.productId,this.periodId,function(res) {
                        for(let v = 0; v < res.data.returnValue.length; v++) {
                            that.storyRecordsList.push(res.data.returnValue[v]);
                        };
                        if(res.data.returnValue.length < 6){
                            that.loading = true;
                            that.noMore = true;
                        }else{
                            that.loading = false;
                        };
                        console.log(that.loading);
                        that.page++;
                    });
                }, 100);
            }
        }
    }
</script>
<style lang="scss">
    #historyRecords{
        .historyRecords-tit{
            width: 100%;
            padding: 13px 15px;
            font-size: 14px;
            color: #666666;
            border-bottom: 1px solid #eaeaea;
        }
        .content{
            top: 47px;
            bottom: 0;
        }
        .page-infinite-listitem{
            position: relative;
            padding: 0 15px;
            height: 55px;
            width: 100%;
            margin-top: 0;
            border-bottom: 1px solid #eaeaea;
            .hr-left{
                max-width: 10%;
                height: 100%;
                img{
                    margin-top: 10px;
                    width: 34px;
                    height: 34px;
                    border: 3px solid #f3f3f3;
                    border-radius: 50%;
                }
            }
            .hr-middle{
                margin-left: 10px;
                max-width: 80%;
                height: 100%;
                font-size: 13px;
                p{
                    position: relative;
                    top: 11px;
                    width: 100%;
                    color: #ccc;
                    span{
                        color: #333;
                    }
                }
            }
            .hr-right{
                position: absolute;
                right: 15px;
                top: 0;
                width: 105px;
                height: 55px;
                line-height: 75px;
                text-align: right;
                color: #666666;
                font-size: 13px;
                span{
                    color: #f93069;
                }
            }
        }
    }
</style>
