<template>
    <div id="category">
        <div class="leftList">
            <ul>
                <li v-for="(item, index) in classList" @click="selectThis(index)" :class="{active : activeId == index}">
                    {{item.productClassName}}
                </li>
            </ul>
        </div>
        <div class="rightList">
            <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                    <li class="page-infinite-listitem" v-for="item in productList">
                        {{item.productName}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
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
            let that = this;
            this.loading = true;
            setTimeout(() => {
                this.api.getClassProductList( this.page_index, this.page_size, '11111', this.product_class_id, function(data){
                    console.log(data);
                    for(let v = 0; v < data.data.returnValue.length; v++) {
                        that.productList.push(data.data.returnValue[v]);
                    };
                    if(data.data.returnValue.length==0){
                        that.loading = true;
                    }else{
                        that.loading = false;
                    };
                    that.page_index++;
                    console.log(that.loading)
                });
                this.loading = false;
            }, 500);
        },
        selectThis(n){
            console.log(n)
            this.activeId = n;
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
            height: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 22%;
            overflow: auto;
            background: #ccc;
            .page-infinite-wrapper{
                ul{
                    width: 100%;
                    li{
                        width: 100%;
                        height: 102px;

                    }
                }
            }
        }
    }
</style>
