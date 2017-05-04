export default {
	getData (state,count){
		state.count = count;
	},
	goShopping (state,shopping){
		state.shopping = shopping;
	},
	hideShopping(state,shoppingAlert){
		state.shoppingAlert = shoppingAlert;
	},
	selectTab(state,footerbarState){
		state.footerbarState = footerbarState;
	}
}
