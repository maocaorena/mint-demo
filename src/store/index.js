import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	count: "damaoa",
	shopping:null,
	shoppingAlert: 'close',
	token : false,
	footerbarState: 1,
	loginState: 1,
	alertLoginState:false,
	addrMode: {},
	addrAdd: {}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
