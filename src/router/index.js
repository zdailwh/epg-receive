import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/config/configs'
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },

  {
    path: '/config',
    component: Layout,
    meta: { title: '参数配置', icon: 'table' },
    children: [
      {
        path: 'configs',
        name: 'Configs',
        component: () => import('@/views/configs/index'),
        meta: { title: '文件路径配置', icon: 'table' }
      },
      {
        path: 'whiteips',
        name: 'Whiteips',
        component: () => import('@/views/whiteips/index'),
        meta: { title: 'IP白名单列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/providers',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Providers',
        component: () => import('@/views/providers/index'),
        meta: { title: '数据提供机构', icon: 'table' }
      },
      {
        path: ':providerid/whiteips',
        name: 'WhiteipsOfProvider',
        component: () => import('@/views/whiteips/index'),
        meta: { title: '查询白名单', icon: 'table' },
        hidden: true
      }
    ]
  },

  {
    path: '/receptions',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Receptions',
        component: () => import('@/views/receptions/index'),
        meta: { title: '接收数据管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/epgs',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Epgs',
        component: () => import('@/views/epgs/index'),
        meta: { title: 'EPG信息管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'Users',
        component: () => import('@/views/users/index'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'authentications',
        name: 'Authentications',
        component: () => import('@/views/users/authentications'),
        meta: { title: '登录认证', icon: 'table' }
      }
    ]
  },

  {
    path: '/task',
    component: Layout,
    meta: { title: '任务系统管理', icon: 'table' },
    children: [
      {
        path: 'index',
        name: 'TaskIndex',
        component: () => import('@/views/tasks/index'),
        meta: { title: '任务总览', icon: 'table' }
      },
      {
        path: 'mainJobs',
        name: 'MainJobs',
        component: () => import('@/views/tasks/mainJobs'),
        meta: { title: '主任务', icon: 'table' }
      },
      {
        path: 'mainThreads',
        name: 'MainThreads',
        component: () => import('@/views/tasks/mainThreads'),
        meta: { title: '主线程', icon: 'table' }
      },
      {
        path: 'mainThreads/:mainthreadsid/mainJobs',
        name: 'JobsOfMainThread',
        component: () => import('@/views/tasks/mainJobs'),
        meta: { title: '查看jobs', icon: 'table' },
        hidden: true
      },
      {
        path: 'schedule',
        name: 'JobsSchedule',
        component: () => import('@/views/tasks/mainJobs'),
        meta: { title: '查看jobs调度', icon: 'table' },
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
