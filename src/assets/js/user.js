/**
 * User
 */
import { Storage } from './storage.js'; //引入Storage
const User = {
	getAppKey : function(){
		let appInfo = Storage.getItemJson(Storage.QQAppInfo) || Storage.getItemJson(Storage.wxAppInfo);
		let appKey = '';
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
	},
	getMemberId : function(){
		let memberInfo = Storage.getItemJson(Storage.memberInfo);
		let id = '';
		if(memberInfo.id){
	    	id = memberInfo.id;
	    };
	    return id;
	},
}
export { User };
