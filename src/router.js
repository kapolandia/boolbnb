import { createRouter, createWebHashHistory } from "vue-router";

import AppIndex from './pages/AppIndex.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: AppIndex
        },
    ]
});

export {router};