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
	}
}