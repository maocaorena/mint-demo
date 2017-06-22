/**
 * Storage
 */
 const Storage = {
	//本地存储字段
	memberInfo: 'memberInfo', //用户信息
	searchRecords: 'searchRecords', //搜索记录
	id: 'id', //用户id
	token: 'token', //用户token值,
	autoLoginQuery: 'autoLoginQuery',
	redirectLoginUrl: 'redirectLoginUrl', //免登陆唤醒登陆地址，对方登陆页面
	appHomeUrl: 'appHomeUrl', //返回appH5的首页,
	wxAppInfo: 'wxAppInfo', //保存从微信来的信息
	QQAppInfo: 'QQAppInfo',
	appEntrance: 'appEntrance', //入口id
	noHis : true,
	setItem : function(name, content){
		if (!name) return;
		if (typeof content !== 'string') {
			 content = JSON.stringify(content);
		};
		window.localStorage.setItem(name, content);
	},
	getItem : function(name){
		if (!name) return;
		return window.localStorage.getItem(name) || '';
	},
	getItemJson : function(name){
		if (!name) return;
		return JSON.parse(window.localStorage.getItem(name)) || '';
	},
	removeItem : function(name){
		if (!name) return;
		window.localStorage.removeItem(name);
	},
	isNoHis: function () {
		let testKey = 'test',
			storage = window.sessionStorage;
		try {
			storage.setItem(testKey, 'testValue');
			storage.removeItem(testKey);
			return true;
		} catch(error) {
			return false;
		}
	}
}
export { Storage };
