import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'default',
  component: () => import('@/views/index.vue')
},
{
  path: '/login',
  name: 'Login',
  component: () => import('../views/login.vue')
},
{
  path: '/index',
  name: 'Index',
  component: () => import('@/views/index.vue'),
  redirect: {
    name: 'Wel'
  },
  children: [{ path: 'wel', name: 'Wel', component: () => import('@/views/wel.vue') }
    // { path: 'user1', name: 'User', component: () => import('../views/user1.vue') },
    // { path: 'user2', name: 'User2', component: () => import('@/views/user2.vue') },
    // { path: 'juese', name: 'Juese', component: () => import('@/views/juese.vue') },
    // { path: 'cate1', name: 'Cate1', component: () => import('@/views/cate1.vue') },
    // { path: 'cate2', name: 'Cate2', component: () => import('@/views/cate2.vue') }
  ]
}
// {
//   path: '*',
//   name: '404',
//   component: () => import('@/views/404.vue')
// }
]

// 定义权限路由
const asyncRoutes = {
  user1: {
    path: 'user1',
    name: 'User1',
    component: () => import('../views/user1.vue'),
    meta: { keepAlive: false, name: '用户列表' }
  },
  user2: {
    path: 'user2',
    name: 'User2',
    component: () => import('@/views/user2.vue'),
    meta: { keepAlive: false, name: '用户信息' }
  },
  juese: {
    path: 'juese',
    name: 'Juese',
    component: () => import('@/views/juese.vue'),
    meta: { keepAlive: false, name: '角色信息' }
  },
  cate1: {
    path: 'cate1',
    name: 'Cate1',
    component: () => import('@/views/cate1.vue'),
    meta: { keepAlive: false, name: '商品管理' }
  },
  cate2: {
    path: 'cate2',
    name: 'Cate2',
    component: () => import('@/views/cate2.vue'),
    meta: { keepAlive: false, name: '商品分类' }
  }
}

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.name) {
    const { name, meta } = to
    const items = {
      name: meta.name,
      path: name.toLowerCase()
    }
    const tabs = JSON.parse(sessionStorage.getItem('userTabs')) || []
    if (tabs.length === 0) {
      tabs.push(items)
    } else {
      let num = 0
      tabs.forEach(v => {
        if (v.name === items.name) {
          num += 1
        }
      })
      if (num === 0) {
        tabs.push(items)
      }
    }
    store.commit('useraddTabs', tabs)
  }
  if (to.path === '/login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
router.selfaddRoutes = function (params) {
  router.matcher = new VueRouter().matcher
  router.addRoutes(params)
}

export const initDynamicRouter = () => {
  const currentRoutes = router.options.routes
  const userRights = store.state.userRights
  userRights.forEach(item => {
    item.children.forEach(i => {
      const temp = asyncRoutes[i.path]
      currentRoutes[2].children.push(temp)
    })
  })
  // router.addRoutes(currentRoutes)
  currentRoutes.push(
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404.vue')
    })
  router.selfaddRoutes(currentRoutes)
}

export default router
