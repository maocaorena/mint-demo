/**
 * User
 */
import { Storage } from './storage.js'; //引入Storage
const User = {
 	info : Storage.getItemJson(Storage.QQAppInfo) || Storage.getItemJson(Storage.wxAppInfo),
	getAppKey : function(){
		let appKey = '';
		console.log(this.info);
		if(this.info.appKey){
	    	appKey = this.info.appKey;
	    };
	    return appKey;
	}
}
export { User };
