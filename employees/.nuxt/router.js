import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _681cc4ee = () => interopDefault(import('..\\pages\\add.vue' /* webpackChunkName: "pages_add" */))
const _b92a5ad6 = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages_test" */))
const _7ef33f66 = () => interopDefault(import('..\\pages\\test\\index.vue' /* webpackChunkName: "pages_test_index" */))
const _7baa5026 = () => interopDefault(import('..\\pages\\users\\_id\\index.vue' /* webpackChunkName: "pages_users__id_index" */))
const _3a758942 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/add",
    component: _681cc4ee,
    name: "add"
  }, {
    path: "/test",
    component: _b92a5ad6,
    children: [{
      path: "",
      component: _7ef33f66,
      name: "test"
    }]
  }, {
    path: "/users/:id?",
    component: _7baa5026,
    name: "users-id"
  }, {
    path: "/",
    component: _3a758942,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
