<template>
    <div id="login" class="wrapper">
        <div class="content">
            <h3>手机账号登录</h3>
            <div class="list flex flex-s">
                <label for="userName" class="border-item flex">
                    <i class="iconfont icon-shoujihao"></i>
                    <input type="text" name="userName" v-model="mobile" value="" placeholder='手机号' id="userName">
                </label>
                <label for="password" class="border-item flex">
                    <i class="iconfont icon-mima1"></i>
                    <input type="passWord" name="userName" v-model="pw" value="" placeholder='密码' id="password">
                </label>
            </div>
            <div class="button">
                <button @click="login()" class="login">登录</button>
            </div>
            <div class="flex fu">
                <router-link to="/tab/register">
                    忘记密码？
                </router-link>
                <router-link to="/tab/register">
                    注册新用户
                </router-link>
            </div>
            <div class="thirdBottom">
                <div class="third-top">
                    <p>第三方登录</p>
                </div>
                <div class="third-list flex-zhong">
                    <div class="third-item flex flex-s flex-sc flex-hc" @click="tan">
                        <img src="../assets/img/account/wechat.png" alt="">
                        <p>微信</p>
                    </div>
                    <div class="third-item flex flex-s flex-sc flex-hc">
                        <img src="../assets/img/account/wechat.png" alt="">
                        <p>微信</p>
                    </div>
                </div>
            </div>
        </div>
        <router-link class="bottom-button" to="/tab/home">
            返回首页
        </router-link>
    </div>
</template>
<style lang='scss'>
    #login{
        background: #efefef;
        .content{
            top: 0;
            bottom: 40px;
            h3{
                width: 100%;
                height: 60px;
                text-align: center;
                font-size: 20px;
                color: #666666;
                line-height: 60px;
                font-weight: 400;
            }
            .list{
                width: 100%;
                padding: 0 15px;
                margin-bottom: 27px;
                .border-item{
                    width: 100%;
                    padding: 9px 0 9px 18px;
                    background: #fff;
                    margin-bottom: 1px;
                    i{
                        font-size: 25px;
                        color: #ff740d;
                        line-height: 34px;
                        margin-right: 12px;
                    }
                    input{
                        border: 0;
                        outline: none;
                        display: block;
                        padding-left: 0;
                        height: 34px;
                        color: #111;
                        vertical-align: middle;
                        font-size: 14px;
                        line-height: 34px;
                    }
                    input::-webkit-input-placeholder{
                        color: #d2d2d2;
                        font-size: 15px;
                    }
                }
            }
            .button{
                width: 100%;
                padding: 0 15px;
                .login{
                    width: 100%;
                    height: 40px;
                    font-size: 16px;
                    color: #ffffff;
                    border-radius: 5px;
                    background: #E62E36;
                }
            }
            .fu{
                margin-top: 22px;
                padding: 0 15px;
                width: 100%;
                height: 20px;
                a{
                    display: block;
                    width: 50%;
                    height: 100%;
                    color: #666666;
                    font-size: 12px;
                }
                a:nth-child(2){
                    text-align: right;
                }
            }
            .thirdBottom{
                margin-top: 50px;
                width: 100%;
                height: 115px;
                .third-top{
                    position: relative;
                    margin: 0 50px 10px;
                    border-top: 1px solid #999999;
                    p{
                        width: 95px;
                        margin: -10px auto 0;
                        background-color: #efefef;
                        color: #999999;
                        font-size: 13px;
                        text-align: center;
                    }
                }
                .third-list{
                    width: 100%;
                    height: 113px;
                    .third-item{
                        width: 33%;
                        height: 100%;
                        img{
                            width: 48px;
                        }
                        p{
                            margin-top: 5px;
                            width: 48px;
                            text-align: center;
                            font-size: 12px;
                            color: #999999;
                        }
                    }
                }
            }
        }
        .bottom-button{
            position: absolute;
            line-height: 40px;
            bottom: 0;
            width: 100%;
            height: 40px;
            background: #ffffff;
            text-align: center;
            font-size: 16px;
            color: #666666;
        }
    }
</style>
<script type="text/javascript">
    import { Toast } from 'mint-ui';
    import { Util } from '../assets/js/util.js';//引入tanchuang
    import { User } from '../assets/js/user.js';//引入tanchuang
    import { Storage } from '../assets/js/storage.js';//引入tanchuang
    export default{
        data(){
            return{
                mobile: '',
                pw: ''
            }
        },
        methods:{
            tan(){
                console.log(1111);
            },
            login(){
                console.log("qq",this.mobile,this.pw);
                let that = this;
                if(this.mobile != '' && this.pw != '') {
    				this.api.login(User.getAppKey(), this.mobile, this.pw, function(data) {
    					let res = data.data;
    					if(res.successed) {
    						Storage.setItem('memberInfo',res.returnValue);
                            Util.myAlert('登录成功！');
                            that.$router.push({ path: '/tab/home'})
    					} else {
                            Util.myAlert('账号或密码错误！');
    					}
    				})
    			} else {
                    Util.myAlert('账户或密码不能为空！');
    			}
            }
        },
        created(){

        },
        mounted(){

        }
    }
</script>
