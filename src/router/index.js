import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { Message } from 'element-ui'
import Home from '../views/Home.vue'
import Login from '../views/Account/Login.vue'
import Register from '../views/Account/Register.vue'
import Overview from '../views/Features/Overview.vue'
import Things from '../views/Features/Things/index.vue'
import Document from '../views/Features/Document.vue'
import User from '../views/Features/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'home',
        component: Overview
      },
      {
        path: '/things',
        name: 'things',
        component: Things
      },
      {
        path: '/things/model/:id',
        name: 'model',
        component: () => import(/* webpackChunkName: "about" */ '../views/Features/Things/model.vue'),
        meta: {
          keepAlive: false // 不需要缓存
        }
      },
      {
        path: '/things/device/add',
        name: 'device',
        component: () => import(/* webpackChunkName: "about" */ '../views/Features/Things/addDevice.vue'),
        meta: {
          keepAlive: false // 不需要缓存
        }
      },
      {
        path: '/things/device/:id',
        name: 'device',
        component: () => import(/* webpackChunkName: "about" */ '../views/Features/Things/device.vue'),
        meta: {
          keepAlive: false // 不需要缓存
        }
      },
      {
        path: '/document',
        name: 'document',
        component: Document
      },
      {
        path: '/user',
        name: 'user',
        component: User
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/forget_pw',
    name: 'forget_pw',
    component: () => import(/* webpackChunkName: "about" */ '../views/Account/ForgetPw.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line
  // console.log('to:', to)
  // eslint-disable-next-line
  // console.log('from:', from)
  if (['login', 'register', 'forget_pw'].indexOf(to.name) !== -1) {
    next()
  } else {
    // eslint-disable-next-line
    // console.log(store)
    if (store.state.auth && store.state.auth.accessToken) {
      next()
    } else {
      Message.error('请先登陆')
      next({
        name: 'login',
        replace: true
      })
    }
  }
})

export default router
