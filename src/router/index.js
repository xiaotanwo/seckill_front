import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Goods from '@/components/Goods'
import GoodsDetail from '@/components/GoodsDetail'
import CreateSeckillGoods from '@/components/CreateSeckillGoods'
import Order from '@/components/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/goodsDetail',
      component: GoodsDetail
    },
    {
      path: '/createSeckillGoods',
      component: CreateSeckillGoods
    },
    {
      path: '/order',
      component: Order
    }
  ]
})
