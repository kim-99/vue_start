import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'//@就是指src目录
import NewsIndex from '@/views/news/index'
import NewsList from '@/views/news/list'
import NewsDetail from '@/views/news/detail'
import ProductIndex from '@/views/product/index'
import ProductList from '@/views/product/list'
import ProductDetail from '@/views/product/detail'
import Contact from '@/views/contact'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/news',
      name:'news',
      component:NewsIndex,
      children:[
        {
          path:'list',
          name:'news list',
          component:NewsList
        },
        {
          path:'detail/:id',
          name:'news detail',
          component:NewsDetail
        }
      ]
    },
    {
      path:'/product',
      name:'products',
      component:ProductIndex,
      children:[
        {
          path:'list',
          name:'product list',
          component:ProductList
        },
        {
          path:'detail/:id',
          name:'product detail',
          component:ProductDetail
        }
      ]
    },
    {//配置一个路由
      path: '/contact',
      name: 'contact',
      component: Contact
    },
  ]
})
