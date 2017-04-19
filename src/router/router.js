import App from '../../App'

const first = r => require.ensure([], () => r(require('./component/first')), 'first')

/*const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [{
			path: '/first',
			component: first
		},
		{
			path: '/second',
			component: secondcomponent
		},
		{
			path: '/find',
			component: find
		},
		{
			path: '/me',
			component: me
		}
	]
});*/
export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/first'
        },
        
    ]
}]