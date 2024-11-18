import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/UserLogin.vue';
import EmployeeList from '../components/EmployeeList.vue';

const routes = [
  {
    path: '/login',
    component: Login // Using UserLogin component
  },
  {
    path: '/employees',
    component: EmployeeList,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/employees'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !user) {
    next('/login');
  } else if (to.path === '/login' && user) {
    next('/employees');
  } else {
    next();
  }
});

export default router;