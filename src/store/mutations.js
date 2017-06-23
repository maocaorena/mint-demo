export default {
	getData(state, count) {
		state.count = count;
	},
	goShopping(state, shopping) {
		state.shopping = shopping;
	},
	showShopping(state, shoppingAlert) {
		state.shoppingAlert = shoppingAlert;
	},
	hideShopping(state, shoppingAlert) {
		state.shoppingAlert = 'close';
	},
	selectTab(state, footerbarState) {
		state.footerbarState = footerbarState;
	},
	changeLoginState(state, loginState) {
		state.loginState = loginState;
	},
	changeRouterAnimate(state, count) {
		state.count = count;
	},
	changeAlertLogin(state, alertLoginState) {
		state.alertLoginState = alertLoginState;
	},
	pushAddrMode(state, addrMode) {//更改收货地址  传入下一个页面信息
		state.addrMode = addrMode;
	},
	pushAddrAdd(state, addrAdd) {//增加收货地址 传入下一个页面信息
		state.addrAdd = addrAdd;
	}
}