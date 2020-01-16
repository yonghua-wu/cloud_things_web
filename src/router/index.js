import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Account/Login.vue'
import Register from '../views/Account/Register.vue'
import Overview from '../views/Features/Overview.vue'
import Things from '../views/Features/Things.vue'
import Document from '../views/Features/Document.vue'
import User from '../views/Features/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        component: Overview
      },
      {
        path: '/things',
        component: Things
      },
      {
        path: '/document',
        component: Document
      },
      {
        path: '/user',
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

export default router
