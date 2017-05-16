<template>
	<div id="single">
        <div class="content">
            <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60" infinite-scroll-immediate-check="true">
					<li v-for="item in list" class="page-infinite-listitem flex">
                        <div class="winnerHead">
                            <img :src="item.memberFace" alt="">
                        </div>
                        <div class="singleDetail">
                            <p class="sdTop flex">
                                <span>{{item.nickName}}</span>
                                <span>{{item.created}}</span>
                            </p>
                            <div class="sdBottom">
                                <p>
                                    <span>【{{item.periodsNumber}}期】</span><span>{{item.productName}}</span>
                                </p>
                                <p>
                                    {{item.sunContent}}
                                </p>
                                <div class="images flex">
                                    <img :src="img" alt="" v-for="img in item.img">
                                </div>
                            </div>
                        </div>
					</li>
				</ul>
			</div>
        </div>
	</div>
</template>

<style lang="scss">
    #single{
        .content{
            width: 100%;
            height: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            overflow: auto;
            .page-infinite-wrapper{
                width: 100%;
                .page-infinite-list{
                    width: 100%;
                    .page-infinite-listitem{
                        width: 100%;
                        padding: 10px;
                        .winnerHead{
                            width: 15%;
                            img{
                                width: 50px;
                                width: 50px;
                            }
                        }
                        .singleDetail{
                            width: 84%;
                            padding-left: 10px;
                            .sdTop{
                                width: 100%;
                                padding: 5px 0;
                                span{
                                    display: inline-block;
                                    font-size: 12px;
                                }
                                span:nth-child(1){
                                    width: 40%;
                                    text-align: left;
                                }
                                span:nth-child(2){
                                    width: 60%;
                                    text-align: right;
                                    color: #999;
                                }
                            }
                            .sdBottom{
                                width: 100%;
                                background: #f9f9f9;
                                padding: 10px;
                                p{
                                    width: 100%;
                                    span{
                                        font-size: 12px;
                                    }
                                    span:nth-child(1){
                                        color: #999;
                                    }
                                    span:nth-child(2){
                                        color: #ff903e;
                                    }
                                }
                                p:nth-child(2){
                                    width: 100%;
                                    font-size: 13px;
                                    padding: 5px 0;
                                }
                                .images{
                                    padding-top: 10px;
                                    img{
                                        width: 60px;
                                        height: 60px;
                                        margin-right: 5px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>

<script type="text/babel">
	export default {
		data() {
			return {
                productId: this.$route.query.goodsId || '',
                list: [],
				page: 1,
				loading: false,
				wrapperHeight: 0,
				loadMoreSwitch: true,
			};
		},
		methods: {
            loadMore(){
                this.loading = true;
                let that = this;
                this.api.getSingle(this.page,6,this.productId,function(data){
                    for(let v = 0; v < data.data.returnValue.length; v++) {
                        that.list.push(data.data.returnValue[v]);
                    };
                    if(data.data.returnValue.length==0 || data.data.returnValue.length < 6 ){
                        that.loading = true;
                    }else{
                        that.loading = false;
                    };
                    that.page++;
                })
            }
		},
		created() {
            this.loadMore();
		},
		mounted() {

		}
	};
</script>
