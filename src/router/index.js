import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store.js'
//
import Home from '@/components/Home'
import MMAside from '../components/MMAside.vue'
import MMMain from '../components/MMMain.vue'
import MMHeader from '../components/MMHeader.vue'
import MMLogin from '../components/MMLogin.vue'
import Detail from '../components/Detail.vue'

import Product from '../components/ProductManager.vue'
import Icon from '../components/IconManager.vue'
import ProductDetail from '../components/ProductDetailManager.vue'
import Model from '../components/ModelManager.vue'
import Series from '../components/SeriesManager.vue'
import Tab from '../components/Tab.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true
      },
      children: [{
          path: 'mmheader',
          name: 'mmheader',
          component: MMHeader
        },
        {
          path: 'mmaside',
          name: 'mmaside',
          component: MMAside
        },
        {
          path: 'mmmain',
          name: 'mmmain',
          component: MMMain,
          children: [{
              path: '/detail',
              name: 'detail',
              component: Detail,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/product',
              name: 'product',
              component: Product,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/icon',
              name: 'icon',
              component: Icon,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/productDetail',
              name: 'productDetail',
              component: ProductDetail,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/model',
              name: 'model',
              component: Model,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/series',
              name: 'series',
              component: Series,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/tab',
              name: 'tab',
              component: Tab,
              meta: {
                requireAuth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: MMLogin
    },
  ]
})

router.beforeEach((to, from, next) => {

  let token = store.state.token;

  if (to.meta.requireAuth == true) {

    //需要验证登录
    if (!token) {

      //弹框提示去登录
      alert('暂未登录,请先去登录')

      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })

    } else {

      next();
    }
  } else {

    next();
  }

})

export default router;
