/**
 * User
 */
import { Storage } from './storage.js'; //引入Storage
const User = {
	getAppKey : function(){
		let appInfo = Storage.getItemJson(Storage.QQAppInfo) || Storage.getItemJson(Storage.wxAppInfo);
		let appKey = '';
		console.log(appInfo);
		if(appInfo.appKey){
	    	appKey = appInfo.appKey;
	    };
	    return appKey;
	},
	getToken : function(){
		let memberInfo = Storage.getItemJson(Storage.memberInfo);
		let token = '';
		if(memberInfo.token){
	    	token = memberInfo.token;
	    };
	    return token;
	}
}
export { User };
