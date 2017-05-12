import Vue from 'vue';
import axios from 'axios';
import config from './config';
import qs from 'qs';
import { Toast } from 'mint-ui'

class API {
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
		    }
		    //console.log(error.config);
		})
	};
	getWinnerMessage (periodId,callback){
		this.ajax("order/getUserByWinApi.json",{
					"periodId":periodId
				},callback)
	};
}
export default API;
