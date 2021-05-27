import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dataoverview from '../components/Dataoverview.vue';
import User from '../components/User.vue';
import Questions from '../components/Querstions.vue';
import Company from '../components/Company.vue';
import Subject from '../components/Subject.vue';
import { getLocal } from '../utils/local';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/mathnumber',
    component: Home,
    children: [
      {
        path: '/mathnumber',
        component: Dataoverview,
        icon: 'el-icon-menu',
        name: '数据概括',
      },
      {
        path: '/user',
        component: User,
        icon: 'el-icon-menu',
        name: '用户列表',
      },
      {
        path: '/questions',
        component: Questions,
        icon: 'el-icon-menu',
        name: '题库列表',
      },
      {
        path: '/company',
        component: Company,
        icon: 'el-icon-menu',
        name: '企业列表',
      },
      {
        path: '/subject',
        component: Subject,
        icon: 'el-icon-menu',
        name: '学科列表',
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const TOKEN = getLocal('token');
  console.log(TOKEN);
  console.log(to);

  if (to.name !== 'Login' && !TOKEN) {
    return next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
