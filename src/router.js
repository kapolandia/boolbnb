import { createRouter, createWebHashHistory } from "vue-router";

import AppIndex from './pages/AppIndex.vue';
import HostShow from './pages/HostShow.vue';
import AppSearch from "./pages/AppSearch.vue";
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

        },
        {
            path: '/host/:search/',
            name:'host-search',
            component:AppSearch

        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return new Promise((resolve) => {
                // Use nextTick to ensure the DOM is updated before scrolling
                nextTick(() => {
                    resolve(savedPosition);
                });
            });
        } else {
            return { left: 0, top: 0 };
        }
    }
});

export {router};