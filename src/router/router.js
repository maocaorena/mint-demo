import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/';//引入vuex
import App from '../App.vue'
import home from '../component/home.vue'
import latestAnnounced from '../component/latestAnnounced.vue'
import find from '../component/find.vue'
import me from '../component/me.vue'
import productDetail from '../component/productDetail.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: App,
	children: [
		{
            path: '',
            redirect: '/tab/home'
        },
		{
			path: '/tab/home',
			component: home
		},
		{
			path: '/tab/latestAnnounced',
			component: latestAnnounced
		},
		{
			path: '/tab/find',
			meta: {
	            requireAuth: true,
	        },
			component: find
		},
		{
			path: '/tab/me',
			component: me
		},
		{
			path: '/tab/home/productDetail',
			component: productDetail
		}
	]
}];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
	if(from.path == "/tab/home/productDetail" || from.path == "/tab/home"){
		store.commit('hideShopping', false);
	};
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }else {
            next({
                path: '/tab/me',
                query: {}
            })
        };
    }else {
        next();
    };
});

export default router;