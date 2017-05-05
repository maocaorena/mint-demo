import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/';//引入vuex
import App from '../App.vue'
import first from '../component/first.vue'
import second from '../component/second.vue'
import find from '../component/find.vue'
import me from '../component/me.vue'
import detail from '../component/detail.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: App,
	children: [
		{
            path: '',
            redirect: '/first'
        },
		{
			path: '/first',
			component: first,
			children: [{
				path: 'detail',
				component: detail
			}]
		},
		{
			path: '/second',
			component: second
		},
		{
			path: '/find',
			meta: {
	            requireAuth: true,
	        },
			component: find
		},
		{
			path: '/me',
			component: me
		}
	]
}];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
	console.log("ccccc");
    if (to.matched.some(r => r.meta.requireAuth)) {
    	console.log("ccccc");
        if (store.state.token) {
            next();
        }else {
            next({
                path: '/me',
                query: {}
            })
        };
    }else {
        next();
    };
});

export default router;