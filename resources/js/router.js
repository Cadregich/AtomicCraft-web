import {createRouter, createWebHistory} from 'vue-router';
import * as middlewares from './middlewares.js';
import store from "./vuex";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./components/HomePage.vue'),
            name: 'home'
        },
        {
            path: '/registration',
            component: () => import('./components/RegistrationPage.vue'),
            name: 'registration',
            beforeEnter: middlewares.guest
        },
        {
            path: '/login',
            component: () => import('./components/LoginPage.vue'),
            name: 'login',
            beforeEnter: middlewares.guest
        },
        {
            path: '/user-data',
            component: () => import('./components/UserData.vue'),
            name: 'user-data',
            beforeEnter: middlewares.auth
        },
        {
            path: '/logout',
            component: () => import('./components/LogoutPage.vue'),
            name: 'logout',
            beforeEnter: middlewares.auth
        },
        {
            path: '/cabinet',
            component: () => import('./components/Cabinet/CabinetPage.vue'),
            name: 'cabinet'
        },
        {
            path: '/privileges',
            component: () => import('./components/PrivilegesPage.vue'),
            name: 'privileges'
        },
        {
            path: '/payment-finished',
            component: () => import('./components/Shop/PaymentFinished.vue'),
            name: 'payment-finished'
        },
        {
            path: '/test',
            component: () => import('./components/Test.vue'),
            name: 'test'
        },
        {
            path: '/shop',
            component: () => import('./components/Shop/ShopPage.vue'),
            name: 'shop'
        },
        {
            path: '/shop/create',
            component: () => import('./components/Shop/ShopCreateProduct.vue'),
            name: 'shop.create'
        },
        {
            path: '/shop/purchases-history',
            component: () => import('./components/Shop/PurchasesHistory.vue'),
            name: 'shop.purchases-history'
        }
    ],
});

router.beforeEach(async (to, from, next) => {
    const cookie = await store.dispatch('getCookie', 'ait');
    if (!cookie) {
        if (store.getters.Auth) {
            console.warn('Authorization token has expired');
            store.dispatch('logout');
        }
    }
    next();
});

export default router;
