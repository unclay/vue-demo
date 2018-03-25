import vue from 'vue';
import vueRouter from 'vue-router';
import path from 'path';

// view
const Error404 = () => import('../page/error/404.vue');
const HomeIndex = () => import('../page/home/index.vue');

vue.use(vueRouter);

// define router
const router = new vueRouter({
  routes: [
    // 404 error page
    {
      path: '/404',
      component: Error404,
    },
    {
      path: '/index',
      component: HomeIndex,
    },
    // 
    {
      path: '*',
      redirect: '/404',
    },
  ],
});

export default router;
