import Vue from 'vue';
import axios from 'axios';
import config from './config';
import qs from 'qs';
import { Util } from '../assets/js/util.js'; //引入Util
import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
class API {
	getN (url,param) {
		/*防止缓存*/
		var randomNum1 = parseInt(Math.random() * 10);
		var randomNum2 = parseInt(Math.random() * 1000) + '' + new Date().getTime();
		param['noCache' + randomNum1] = randomNum2;
		config.url = url;
		config.data = {};
		config.params = {};
		config.params = param;
		return axios.get(url,config);//使用get方式
		//return axios(config);//使用post方式
	};
	ajax (url,param,callback){
		let that = this;
		this.getN(url,param).then(callback).catch(function(error){
			that.errorHandle(error);
		});
	};
	ajax1 (url,param,callback,then){
		let that = this;
		this.getN(url,param).then(callback).then(then).catch(function(error){
			that.errorHandle(error);
		});
	};
	
	ajaxPost (url,param,callback){
		let that = this;
		this.postN(url,param).then(callback).catch(function(error){
			that.errorHandle(error);
		});
	};
	
	//post请求
	postN (url,param) {
		/*防止缓存*/
		var randomNum1 = parseInt(Math.random() * 10);
		var randomNum2 = parseInt(Math.random() * 1000) + '' + new Date().getTime();
		param['noCache' + randomNum1] = randomNum2;
		config.url = url;
		config.params = {};
		config.data = {};
		config.data = param;
		return axios(config);//使用post方式
	};
	//上传图片
	postUp (url,param,callback,progress) {
		let allUrl = config.baseURL + url;
		let upconfig = {
			onUploadProgress: progress
			
		}
		return axios.post(allUrl, param,upconfig).then(callback);//使用post方式
	};

	//请求错误处理
	errorHandle(error){
		Indicator.close();
		if (error.response || error.message.indexOf("timeout") > -1) {
			//状态不在200和超时的处理
			Indicator.close();
			Util.myAlert("服务器未响应")
		}
	};

	// 获取商品列表
	getProductList (appKey,status,page_index,page_size,callback){
		this.ajax("product/getProductListApi.json",{
			"appKey": appKey,
			"status": status,
			"page_index": page_index,
			"page_size": page_size
		},callback)
	};

	// 获取活动商品列表
	getActiveProductList (message,callback){
		this.ajax("product/getProductListApi.json",message,callback)
	};

	// 获取首页banner轮播图
	getHomeSwiperList (appKey,callback,then){
		this.ajax1("adv/advApi.json",{
			"appKey": appKey,
		},callback,then)
	};

	// 获取首页小喇叭
	getHomeSwiperWinList (appKey,callback,then){
		this.ajax1("period/getwinMemberPeriodData.json",{
			"appKey": appKey,
		},callback,then)
	};

	// 获取商品商品详情页中奖人信息
	getWinnerMessage (periodId,callback){
		this.ajax("order/getUserByWinApi.json",{
					"periodId":periodId
				},callback)
	};

	// 图文详情
	getImageTextMessage (periodId,goodsId,callback){
		this.ajax("product/getProductDetailApi.json",{
					"periodId":periodId,
					"goodsId":goodsId
				},callback)
	};

	// 商品详情页晒单
	getSingle (page_index,page_size,goodsId,callback){
		this.ajax("sunorder/getSunOrderListApi.json",{
					"goodsId":goodsId,
					"page_index":page_index,
					"page_size":page_size
				},callback)
	};

	// 最新揭晓
	getLastAnnounList (page_index,page_size,callback){
		this.ajax("period/getPeroidListByLastAnnounApi.json",{
					"page_index":page_index,
					"page_size":page_size
				},callback)
	};

	// 获取商品详情
	getProductDetail (periodId,callback,then){
		this.ajax1("product/getProductDetailApi.json",{
			"periodId": periodId,
		},callback,then)
	};

	// 获取分类列表
	getClassList (periodId,callback){
		this.ajax("productClass/getProductClassApi.json",{

		},callback)
	};

	// 获取分类商品列表
	getClassProductList (page_index,page_size,appKey,product_class_id,callback){
		this.ajax("product/getProductListApi.json",{
			"page_index": page_index,
			"page_size":page_size,
			"appKey":appKey,
			"product_class_id":product_class_id
		},callback)
	};

	// 获取本期历史记录
	getHistoryRecordsList (page_index,page_size,goodsId,periodId,callback){
		this.ajax("order/getOrderRecordByDetailApi.json",{
			"page_index": page_index,
			"page_size":page_size,
			"goodsId":goodsId,
			"periodId":periodId
		},callback)
	};

	// 获取往期揭晓记录
	getAnnouncedList (page_index,page_size,goodsId,callback){
		this.ajax("period/getPeroidListOtherPeriodsApi.json",{
			"page_index": page_index,
			"page_size":page_size,
			"goodsId":goodsId
		},callback)
	};
	
	//账号密码登录
	login (appKey,mobile,password,callback){
		this.ajaxPost("userLogin/loginUserByPassword.json",{
			"appKey": appKey,
			"mobile": mobile,
			"passWord":password,
		},callback)
	};
	
	//微信登录
	wxLogin (appKey,code,callback){
		this.ajaxPost("userLogin/weixinLogin.json",{
			"appKey": appKey,
			"code": code,
		},callback)
	};
	
	//QQ登录
	qqLogin (appKey,code,callback){
		this.ajaxPost("userLogin/qqLogin.json",{
			"appKey": appKey,
			"code": code,
		},callback)
	};
	
	//注册获取验证码
	registerGetCode (mobile,type,callback){
		this.ajaxPost("userLogin/sendSMSCode.json",{
			"mobile": mobile,
			"type": type,
		},callback)
	};
	
	//注册
	register (appKey,mobile,passWord,smsCode,callback){
		this.ajaxPost("userLogin/phoneRegister.json",{
			"appKey": appKey,
			"mobile": mobile,
			"passWord": passWord,
			"smsCode": smsCode
		},callback)
	};
	
	//个人中心获取个人信息
	getUserInfo (token,callback){
		this.ajaxPost("user/getUserInfo.json",{
			"token": token
		},callback)
	};
	
	//获取余额
	getAmount (token,appKey,callback){
		this.ajaxPost("user/getUserAmount.json",{
			"token": token,
			"appKey": appKey
		},callback)
	};
	
	//创建订单
	creatOrder (params,callback){
        this.ajaxPost('order/creatOrderApi.json',params,callback)
	};
	
	//余额支付
	balancePay(params,callback){
		this.ajaxPost('order/payOrderApi.json',params,callback)
	};
	
	// 查询订单是否成功
	afterPayOrder(token,orderNums,callback){
		this.ajax("order/afterPayOrderApi.json",{
			"token": token,
			"orderNums":orderNums
		},callback)
	};
	
	// 获取订单列表
	getOrderRecord(page_index,page_size,token,state,callback){
		this.ajax("order/getOrderRecordByMymemberApi.json",{
			"page_index": page_index,
			"page_size":page_size,
			"token":token,
			"state":state,
		},callback)
	};
	
	// 获取中奖列表
	getWinRecord(page_index,page_size,memberId,orderState,callback){
		this.ajax("order/getWinOrderRecordApi.json",{
			"page_index": page_index,
			"page_size":page_size,
			"memberId":memberId,
			"orderState":orderState,
		},callback)
	};
	
	// 领奖到余额
	addUserBalance(token,orderId,callback){
		this.ajaxPost("user/addUserBalance.json",{
			"token" : token,
			"orderId" : orderId
		},callback)
	};
	
	// 获取收货地址列表
	getDeliveryAddressList(token,callback){
		this.ajax("deliveryAddress/getDeliveryAddressList.json",{
			"token": token
		},callback)
	};
	
	// 添加收货地址列表
	addDeliveryAddress(params,callback){
		this.ajaxPost("deliveryAddress/addDeliveryAddress.json",params,callback)
	};
	
	// 删除收货地址
	deleteAddress(token,id,callback){
		this.ajaxPost("deliveryAddress/deleteDeliveryAddress.json",{
			"token": token,
			"id": id
		},callback)
	};
	
	// 编辑收货地址
	updateAddress(params,callback){
		this.ajaxPost("deliveryAddress/updateDeliveryAddress.json",params,callback)
	};
	
	// 选择收货地址
	selectAddress(orderId,addressId,callback){
		this.ajaxPost("order/addOrderAddressApi.json",{
			"orderId": orderId,
			"addressId": addressId
		},callback)
	};
	
	// 确认收货
	updateOrderstate(token,orderId,orderState,callback){
		this.ajaxPost("order/updateOrderstateApi.json",{
			"token": token,
			"orderId": orderId,
			"orderState": orderState
		},callback)
	};
	
	// 获取未晒单列表
	getNoSunOrderList(page_index,page_size,memberId,orderState,sunState,callback){
		this.ajax("order/getWinOrderRecordApi.json",{
			"page_index": page_index,
			"page_size": page_size,
			"memberId": memberId,
			"orderState": orderState,
			"sunState": sunState,
		},callback)
	};
	
	// 获取已晒单列表
	getMySunOrderList(page_index,page_size,token,memberId,callback){
		this.ajax("sunorder/getSunOrderListApi.json",{
					"page_index":page_index,
					"page_size":page_size,
					"token":token,
					"memberId":memberId,
				},callback)
	};
	
	// 晒单上传图片
	upImg(params,callback){
		this.ajaxPost("common/uploadApi.json",params,callback)
	};
}
export default API;
