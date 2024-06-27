import { createRouter, createWebHashHistory } from "vue-router";

import AppIndex from './pages/AppIndex.vue';
import HostShow from './pages/HostShow.vue';
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: AppIndex
        },
        {
            path: '/hosts/:slug',
            name:'host-show',
            component:HostShow

        }
    ]
});

export {router};