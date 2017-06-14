import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	count: "damaoa", //首页商品列表
	shopping:null,
	shoppingAlert: 'close',
	token : false,
	footerbarState: 1,
	loginState: 1
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
