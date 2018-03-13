import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import List from '@/components/List'
import Item from '@/components/Item'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    console.log(savedPosition)
    return savedPosition
    // return 期望滚动到哪个的位置
  },
  routes: [
    {
      path: '/vue/history/index.html',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/vue/history/index.html/list',
      name: 'List',
      component: List
    },
    {
      path: '/vue/history/index.html/list/:id',
      name: 'Item',
      component: Item
    },
    {
      path: '*',
      name: 'Item',
      component: NotFound,
    }
  ]
})
