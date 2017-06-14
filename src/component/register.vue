<template>
    <div id="register" class="wrapper">
        <div class="content">
            <h3>注册</h3>
            <div class="list flex flex-s">
                <label for="userName" class="border-item flex">
                    <i class="iconfont icon-shoujihao"></i>
                    <input type="text" name="userName" value="" placeholder='手机号' id="userName">
                </label>
                <label for="code" class="border-item flex">
                    <i class="iconfont icon-yanzhengma"></i>
                    <input type="text" name="userName" value="" placeholder='短信验证码' id="code">
                    <div class="get-code">获取验证码</div>
                </label>
                <label for="password" class="border-item flex">
                    <i class="iconfont icon-mima1"></i>
                    <input type="text" name="userName" value="" placeholder='密码' id="password">
                </label>
            </div>
            <div class="button">
                <button type="button" name="button" class="login" @click="register">注册</button>
            </div>
            <div class="flex fu">
                <div class="item flex">
                    <input class="my-choekbox" type="checkbox" checked="checked">
                    <span class="agrement">我同意《用户协议》</span>
                </div>
                <router-link class="item" to="/tab/account/login_account">
                    已注册去登录
                </router-link>
            </div>
        </div>
    </div>
</template>
<style lang='scss'>
    #register{
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
                label:nth-child(2){
                    position: relative;
                    .get-code{
                        position: absolute;
                        top: 15px;
                        width: 100px;
                        height: 25px;
                        right: 5px;
                        z-index: 2;
                        line-height: 25px;
                        text-align: center;
                        border-left: 1px solid #dddddd;
                        color: #ff740d;
                        font-size: 13px;
                        background: #ffffff;
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
                    background: #CECECE;
                }
            }
            .fu{
                margin-top: 22px;
                padding: 0 15px;
                width: 100%;
                height: 20px;
                .item{
                    display: block;
                    width: 50%;
                    height: 100%;
                    color: #666666;
                    font-size: 12px;
                    .agrement{
                        position: relative;
                        bottom: 5px;
                        left: 3px;
                    }
                    .my-choekbox{
                        position: relative;
                        width: 20px;
                        height: 20px;
                        -webkit-appearance: none;
                        outline: none;
                    }
                    .my-choekbox::before{
                        content: '';
                        display: block;
                        width: 20px;
                        height: 20px;
                        border: 1px solid #ccc;
                        border-radius: 50%;
                        background: #fff;
                    }
                    .my-choekbox::after{
                        content: '';
                        position: absolute;
                        top: 26%;
                        left: 26%;
                        display: block;
                        width: 14px;
                        height: 6px;
                        border-left: 1px solid #ff740d;
                        border-bottom: 1px solid #ff740d;
                        -webkit-transform: rotate(-45deg);
                        transform: rotate(-45deg);
                        opacity: 0;
                    }
                    .my-choekbox:checked:after{
                        opacity: 1;
                    }
                }
                a{
                    text-align: right;
                }
            }
        }
    }
</style>
<script type="text/javascript">
    export default{
        data(){
            return{
				mobile : '',
				pw : '',
				code : '',
				agree : true,
				cutdown : 60
            }
        },
        methods:{
			register(){
				console.log('mobile:',this.mobile,'pw:',this.pw,'code:',this.code,'agree:',this.agree)
			}
        },
        created(){

        },
        mounted(){
            
        }
    }
</script>
