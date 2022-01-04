<template>
  <div id="app">
    <MainMenu/>
    <router-view/>
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue'
import request from "request"

export default {
  name: 'App',
  components: {
    MainMenu
  },
  mounted(){
    request('http://localhost:8080/api/test', function (error, response, body){
      window.console.log('error:',error);
      window.console.log('statusCode:',response && response.statusCode);
      window.console.log('body:',body);

    });
  },
  methods:{
   /*  shareStoryWeb () {
      this.$kakao.Story.share({
        url: 'https://github.com/eggplantiny/vue-kakao-sdk',
        text: 'Test story share with vue-kakao-sdk'
      })
    },
    loginWithKakao () {
      this.$kakao.Auth.login({
        success (authObj) {
          alert(JSON.stringify(authObj))
        },
        fail (err) {
          alert(JSON.stringify(err))
        }
      })
    } */
  }
}
</script>
 

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>