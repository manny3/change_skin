import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    component: () => import('../views/front/Home.vue'),
    children: [
      {
        path: '/',
        name: 'About',
        component: () => import('../views/front/About.vue'),
      },
      {
        path: 'products',
        name: 'ProductList',
        component: () => import('../views/front/ProductList.vue'),
      },
      {
        path: 'product/:itemID',
        name: 'product',
        component: () => import('../views/front/Product.vue'),
      },
      {
        path: 'check_order',
        name: 'CheckOrder',
        component: () => import('../views/front/CheckOrder.vue'),
      },
      {
        path: 'check_pay/:orderId',
        name: 'CheckPay',
        component: () => import('../views/front/CheckPay.vue'),
      },
      {
        name: 'discounts',
        path: 'Discounts',
        component: () => import('../views/front/Discounts.vue'),
      },
    ],
  },
  {
    name: '登入頁',
    path: '/login',
    component: () => import('../views/back/Login.vue'),
  },
  {
    name: 'Dashboard',
    path: '/admin',
    component: () => import('../components/back/Dashboard.vue'),
    children: [
      {
        name: 'products',
        path: 'products',
        component: () => import('../views/back/Products.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'coupons',
        path: 'Coupons',
        component: () => import('../views/back/Coupons.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'orders',
        path: 'Orders',
        component: () => import('../views/back/Orders.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'CustomerOrder',
        path: 'customer_order',
        component: () => import('../views/back/CustomerOrders.vue'),
      },
      {
        name: 'CustomerCheckout',
        path: 'customer_checkout/:orderId',
        component: () => import('../views/back/CustomerCheckout.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes,
});

export default router;
