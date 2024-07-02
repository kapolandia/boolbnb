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
    ]
});

export {router};