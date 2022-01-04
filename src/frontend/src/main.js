import Vue from 'vue' 
import ElementUI from 'element-ui';
import axios from 'axios';
import AxiosPlugin from 'vue-axios-cors'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import VueKakaoSdk from 'vue-kakao-sdk'

Vue.use(ElementUI);
Vue.use(AxiosPlugin);

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const apikey = 'db5715be56a04ae7aa26b2b026e609b3' // kakao javascript key 
Vue.use(VueKakaoSdk, {apiKey: apikey})

Vue.prototype.$http = axios; //이렇게 하면 다른 js에서 $http로 axios를 사용할 수 있음, 전역으로 사용가능
Vue.prototype.$key = 'PizA5duILWkq9mMFf%2Bf9ti3l0fAP1g79ezIZSirAbtMCIcb90puBIJ3qBgcOE8H2RbdBSctpdCHMTASuKhpmbw%3D%3D'; //ServiceKey 

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


