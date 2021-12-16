import Vue from 'vue' 
import ElementUI from 'element-ui';
import axios from 'axios';
import AxiosPlugin from 'vue-axios-cors'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

Vue.use(ElementUI);
Vue.use(AxiosPlugin);

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.prototype.$http = axios; //이렇게 하면 다른 js에서 $http로 axios를 사용할 수 있음, 전역으로 사용가능

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


