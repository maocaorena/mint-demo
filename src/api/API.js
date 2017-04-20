import axios from 'axios'
import config from './config'
import qs from 'qs'

class API {
	getAdv (param) {
		param.noCache = "1";
		config.params = param;
		return axios.get('adv/advApi.json',config);
	}
	getN (url,param) {
		/*防止缓存*/
		var randomNum1 = parseInt(Math.random() * 10);
		var randomNum2 = parseInt(Math.random() * 1000) + '' + new Date().getTime();
		param['noCache' + randomNum1] = randomNum2;
		config.params = param;
		return axios.get(url,config);
	}
}
export default API;
