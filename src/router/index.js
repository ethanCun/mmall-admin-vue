import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store.js'
//
import Home from '@/components/Home'
import MMAside from '../components/MMAside.vue'
import MMMain from '../components/MMMain.vue'
import MMHeader from '../components/MMHeader.vue'
import MMLogin from '../components/MMLogin.vue'

import Product from '../components/ProductManager.vue'
import Icon from '../components/IconManager.vue'
import ProductDetailManager from '../components/ProductDetailManager.vue'
import Model from '../components/ModelManager.vue'
import Series from '../components/SeriesManager.vue'
import Tab from '../components/Tab.vue'
import AddProduct from '../components/AddProduct.vue'
import EditProduct from '../components/EditProduct.vue'

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
          component: MMMain
        },
        {
          path: '/product',
          name: '产品管理',
          component: Product,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/icon',
          name: '主图管理',
          component: Icon,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/productDetailManager',
          name: '详情页管理',
          component: ProductDetailManager,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/model',
          name: '规格管理',
          component: Model,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/series',
          name: '系列管理',
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
        },
        {
          path: '/addProduct',
          name: '新增产品',
          component: AddProduct,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/editProduct',
          name: '编辑产品',
          component: EditProduct,
          meta:{
            requireAuth: true
          }
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
