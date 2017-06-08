<template>
    <div id="category">
        <div class="leftList">
            <ul>
                <li v-for="(item, index) in classList" @click="selectThis(item.id,index)" :class="{active : activeId == index}">
                    {{item.productClassName}}
                </li>
            </ul>
        </div>
        <div class="rightList content">
            <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <ul class="page-infinite-list" v-infinite-scroll="getProductListByclass" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                    <li class="page-infinite-listitem" v-for="item in productList" :to="{ path: '/tab/home/productDetail', query: { id: item.productId ,periodId: item.periodsId}}">
                        <router-link :to="{ path: '/tab/home/productDetail', query: { id: item.productId ,periodId: item.periodsId}}">
                            <div class="flex">
                                <div class="img">
                                    <img :src="item.image1" alt="">
                                </div>
                                <div class="productmessage">
                                    <p>{{item.productName}}</p>
                                    <progrees-v class="jindu" :length="(item.dbTotalCount-item.dbSurplusCount)/item.dbTotalCount"></progrees-v>
                                    <div class="pmNum flex">
                                        <p>总需 <span>{{item.dbTotalCount}}</span> 人次</p>
                                        <p>剩余 <span>{{item.dbSurplusCount}}</span> 人次</p>
                                    </div>
                                </div>
                            </div>

                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
    import progrees from '../components/progrees.vue';//引入进度条
    export default {
        data() {
            return {
                page_index: 1,
                page_size: 6,
                classList: [],
                productList: [],
                activeId: 0,
                product_class_id: '',
                loading: false,
                loadMoreSwitch: true,
                wrapperHeight: 0,
            };
        },
        components: {
            "progrees-v" : progrees
        },
        methods: {
            getClassList(){
                let that = this;
                this.api.getClassList('',function(data){
                    if(data.data.successed){
                        that.classList = data.data.returnValue;
                    }else{

                    }
                })
            },
            getProductListByclass(){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                this.loading = true;
                let that = this;
                setTimeout(() => {
                    this.api.getClassProductList( this.page_index, this.page_size, 'appkey', this.product_class_id, function(data){
                        for(let v = 0; v < data.data.returnValue.length; v++) {
                            that.productList.push(data.data.returnValue[v]);
                        };
                        if(data.data.returnValue.length==0){
                            that.loading = true;
                        }else{
                            that.loading = false;
                        };
                        that.page_index++;
                        Indicator.close();
                    });

                }, 500);
            },
            selectThis(id,n){
                console.log(id)
                this.activeId = n;
                this.page_index = 1;
                this.productList = [];
                this.product_class_id = id === 1? '' : id;
                this.getProductListByclass();
            }
        },
        created(){
            this.getClassList();
        },
        mounted(){
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
    };
</script>

<style lang="scss">
    #category{
        position: absolute;
        width: 100%;
        height: 100%;
        .leftList{
            width: 22%;
            height: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            overflow: auto;
            background: #eee;
            ul{
                width: 100%;
                li{
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                }
                .active{
                    background: #fff;
                    border-left: 1px solid red;
                }
            }
        }
        .rightList{
            width: 78%;
            top: 0;
            bottom: 0;
            left: 22%;
            .page-infinite-wrapper{
                ul{
                    width: 100%;
                    li{
                        width: 100%;
                        height: 102px;
                        padding: 5px;
                        border-bottom: 1px solid #eee;
                        .img{
                            padding: 0 5px;
                            img{
                                width: 86px
                            }
                        }
                        .productmessage{
                            width: 67%;
                            padding-right: 5px;
                            p{
                                font-size: 12px;
                                line-height: 18px;
                                height: 36px;
                                margin-bottom: 8px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }
                            .jindu{
                                margin-bottom: 10px;
                            }
                            .pmNum{
            					p{
            						width: 50%;
            						font-size: 12px;
            						color: #999;
            						span{
            							color: #f93069;
            						}
            					}
            					p:nth-child(2){
            						text-align: right;
            					}
            				}
                        }
                    }
                }
            }
        }
    }
</style>
