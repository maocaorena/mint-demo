import App from '../App.vue'
import first from '../component/first.vue'
import second from '../component/second.vue'
import find from '../component/find.vue'
import me from '../component/me.vue'
import detail from '../component/detail.vue'

export default [{
    path: '/',
    component: App,
	children: [
		{
            path: '',
            redirect: '/first'
        },
		{
			path: '/first',
			component: first
		},
		{
			path: '/second',
			component: second
		},
		{
			path: '/find',
			component: find
		},
		{
			path: '/me',
			component: me
		},
		{
			path: '/detail',
			component: detail
		}
	]
}]