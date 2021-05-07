// eslint-disable-next-line
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/sign')
  },
  {
    path: '/forgetPwd',
    name: 'forgetPwd',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/forgetPwd')
  },
  {
    path: '/businessSign',
    name: 'businessSign',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/businessSign'),
    children: [
      {
        path: 'enterprise',
        name: 'enterprise',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/enterprise')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "user" */ '@/views/home')
  },
  {
    path: '/base',
    name: 'base',
    component: () => import(/* webpackChunkName: "user" */ '@/views/base/index'),
    redirect: '/home',
    children: [
      {
        path: '/base/content',
        name: 'content',
        component: () => import('@/views/base/content'),
        children: [
          {
            path: '/base/main',
            name: 'main',
            component: () => import('@/views/base/main')
          },
          {
            path: '/base/main/directSupply',
            name: 'directSupply',
            component: () => import('@/views/base/directSupply')
          },
          {
            path: '/base/main/couponList',
            name: 'couponList',
            component: () => import('@/views/base/couponList')
          },
          {
            path: '/base/main/concentration',
            name: 'concentration',
            component: () => import('@/views/base/concentration'),
            children: [
              {
                path: 'review',
                name: 'review',
                component: () => import('@/views/base/review')
              }
            ]
          },
          {
            path: '/base/classification',
            name: 'classification',
            component: () => import('@/views/classification/index'),
            children: [
              {
                path: 'detail',
                name: 'classification_detail',
                component: () => import('@/views/classification/detail')
              },
              {
                path: 'result',
                name: 'classification_result',
                component: () => import('@/views/classification/result')
              },
              {
                path: 'order',
                name: 'order',
                component: () => import(/* webpackChunkName: "user" */ '@/views/classification/order')
              },
              {
                path: 'waitPay',
                name: 'WaitPay',
                component: () => import('@/views/classification/waitPay')
              },
              {
                path: 'payResult',
                name: 'payResult',
                component: () => import('@/views/classification/payResult')
              },
            ]
          }
        ]
      },
      {
        path: 'person',
        name: 'person',
        component: () => import('@/views/person/index'),
        children: [
          {
            path: 'orderDetails',
            name: 'OrderDetails',
            component: () => import('@/views/person/orderDetails')
          }
        ]
      },
      {
        path: 'postComments',
        name: 'postComments',
        component: () => import('@/views/person/postComments')
      },
      {
        path: 'shopCart',
        name: 'shopCart',
        component: () => import('@/views/shopCart/index')
      },
      {
        path: '/base/couponCenter',
        name: 'couponCenter',
        component: () => import('@/views/addCategory/couponCenter')
      },
      {
        path: '/base/newAndHot',
        name: 'newAndHot',
        component: () => import('@/views/addCategory/newAndHot')
      }
    ]
  },
  {
    path: '/safe/loginPassword',
    name: 'loginPassword',
    component: () => import('@/views/person/safe/loginPassword')
  },
  {
    path: '/safe/phone',
    name: 'phone',
    component: () => import('@/views/person/safe/phone')
  },
  {
    path: '/safe/payPassword',
    name: 'payPassword',
    component: () => import('@/views/person/safe/payPassword')
  },
  {
    path: '/safe/setPayPassword',
    name: 'setPayPassword',
    component: () => import('@/views/person/safe/setPayPassword')
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
