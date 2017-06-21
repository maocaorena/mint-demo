<template>
	<div class="goodsItem">
		<img class="shop-type" v-if="goodsItemMessage.productType == 3"  src="../assets/img/home/ten_s@2x.png">
		<img class="shop-type" v-if="goodsItemMessage.productType == 4" src="../assets/img/two/two.png">
		<img class="shop-type" v-if="goodsItemMessage.productType == 5" src="../assets/img/home/five_s@2x.png">
		<img class="shop-type" v-if="goodsItemMessage.productType == 6" src="../assets/img/home/hundred_s@2x.png">
        <router-link class="goodsItem-img" :to="{ path: '/tab/home/productDetail', query: { id: goodsItemMessage.productId ,periodId: goodsItemMessage.periodsId}}">
            <img v-lazy.container="goodsItemMessage.image1" alt="">
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
    	position: relative;
        width: 100%;
        height: 240px;
        color: #fff;
        background: #fff;
        border-radius: 3px;
        padding: 0 3px;
    }
    .shop-type{
    	position: absolute;
    	left: 4px;
    	top: 3px;
    	width: 33px;
    }
    .goodsItem-img{
        display: block;
        padding: 5px 0 10px;
        width: 100%;
        text-align: center;
        img{
            width: 135px;
        }
		img[lazy=loading] {
	        width: 135px;
			background: #ccc;
	    }
    }
    .goodsItem-goodsName{
		width: 100%;
		height: 34px;
        color: #50575d;
        font-size: 13px;
        text-align: left;
		overflow: hidden;
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
                span{
                	display: block;
                }
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
    import { User } from '../assets/js/user.js'; //引入User
    import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
    import { Util } from '../assets/js/util.js'; //引入User
	export default {
		props: [
            'goodsMessage',
            'from'
        ],
        data(){
            return {
                goodsItemMessage : this.goodsMessage,
                userInfo: {},//用户个人信息
            }
        },
        components:{
            "progrees-v" : progrees
        },
        computed:{
        	alertLogin(){
		    	return this.$store.state.alertLogin
		    }
        },
        methods:{
            buy(goodsItemMessage){
                let from = this.from;
                let that = this;
                Indicator.open();
                this.api.getUserInfo(User.getToken(),function(data){
					Indicator.close();
					let res = data.data;
					console.log(res);
					if(res.successed){
						that.userInfo = res.returnValue;
						that.$store.commit('goShopping', goodsItemMessage);
						that.$store.commit('showShopping', from);
					}else{
						Util.myAlert("请登录");
						that.$store.commit('changeAlertLogin', true);
					}
				})
                
            },
        },
        created(){

        }
	}
</script>
