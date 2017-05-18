import Vue from 'vue';
import axios from 'axios';
import config from './config';
import qs from 'qs';
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui';//引入mintUI  indicator组件

class API {
	// 获取商品列表
	getProductList (appKey,status,page_index,page_size,callback){
		this.ajax("product/getProductListApi.json",{
			"appKey": appKey,
			"status": status,
			"page_index": page_index,
			"page_size": page_size
				},callback)
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
	getSingle (page_index,page_size,goodsId = '',callback){
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

	getN (url,param) {
		/*防止缓存*/
		var randomNum1 = parseInt(Math.random() * 10);
		var randomNum2 = parseInt(Math.random() * 1000) + '' + new Date().getTime();
		param['noCache' + randomNum1] = randomNum2;
		config.params = param;
		return axios.get(url,config);
	};
	ajax (url,param,callback){
		this.getN(url,param).then(callback).catch(function(error){
			Indicator.close();
			if (error.response) {
				// 请求已发出，但服务器响应的状态码不在 2xx 范围内
				Toast({
					message: '服务器未响应',
					className: 'toastStyle',
					duration: 1000
				});
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
				if(error.message.indexOf("timeout")>=0){
					Toast({
						message: '服务器响应超时',
						className: 'toastStyle',
						duration: 1000
					})
				};
			};
			//console.log(error.config);
		});
	};
	ajax1 (url,param,callback,then){
		this.getN(url,param).then(callback).then(then).catch(function(error){
			Indicator.close();
			if (error.response) {
				// 请求已发出，但服务器响应的状态码不在 2xx 范围内
				Toast({
					message: '服务器未响应',
					className: 'toastStyle',
					duration: 1000
				});
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
				if(error.message.indexOf("timeout")>=0){
					Toast({
						message: '服务器响应超时',
						className: 'toastStyle',
						duration: 1000
					})
				};
			};
			//console.log(error.config);
		});
	};
}
export default API;
