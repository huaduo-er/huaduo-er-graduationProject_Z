import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home'),
		children: [
			{
				path: '/front',
				name: 'front',
				component: () => import('../components/FrontPage')
			},
			{
				path: '/myRelease',
				name: 'myRelease',
				component: () => import('../components/MyRelease')
			},
			{
				path: '/release',
				name: 'release',
				component: () => import('../components/Release')
			},
			{
				path: '/management',
				name: 'management',
				component: () => import('../components/Management')
			},
			{
				path: '/personalCommunication',
				name: 'personalCommunication',
				component: () => import('../components/PersonalCommunication')
			},
			{
				path: '/message',
				name: 'message',
				component: () => import('../components/Massage')
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login')
	},


]

const router = new VueRouter({
	routes
})

export default router
