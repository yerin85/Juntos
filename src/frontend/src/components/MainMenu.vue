<template>
    <div>   
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            :router="true" >
            <el-menu-item index="/search/animal">동물검색</el-menu-item>
            <el-menu-item index="/search/shelter">보호소검색</el-menu-item>
            <el-menu-item index="/detail">3</el-menu-item>
            <el-menu-item index="/save">입양후기</el-menu-item>
        </el-menu>
    </div>
</template>

<script>

export default {
    data() {
      return {
      }
    },
    created(){
    },
    methods: {
      
    }
  }
</script>

<style scoped>

</style>