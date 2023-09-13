import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import PostDetail from '../views/PostDetailView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/posts/:id',
        name: 'postDetail',
        component: PostDetail,
        props: true
    }
]

export default createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})
