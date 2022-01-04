import Vue from 'vue' 
import VueRouter from 'vue-router';
import Home from '../components/Home.vue'

Vue.use(VueRouter)

// 라우트 컴포넌트와 라우트 정의
const routes = [
    {
        path: '/', //home
        name: 'Home', 
        component:  Home
    },
    {
        path: '/search/animal', //동물 검색
        name: 'SearchAnimal', 
        component:  () => import('../views/SearchAnimal.vue')
    },
    {
        path: '/search/shelter', //보호소 검색
        name: 'SearchShelter', 
        component:  () => import('../views/SearchShelter.vue')
    },
    {
        path: '/detail/:desertionNo', // detail
        name: 'DetailAnimal', 
        component:  () => import('../views/DetailAnimal.vue')
    },
    {
        path: '/save', // detail
        name: 'saveDB', 
        component:  () => import('../views/saveDB.vue')
    }
]

// routes 옵션과 함께 router 인스턴스 생성
const router = new VueRouter({
    mode: 'history', // #을 제거해줌
    routes
})

export default router;