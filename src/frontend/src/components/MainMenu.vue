<template>
    <div>   
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            :router="true" >
            <el-menu-item index="/search/animal">동물검색</el-menu-item>
            <el-menu-item index="/search/shelter">보호소검색</el-menu-item>
            <el-menu-item index="/mypage">3</el-menu-item>
            <el-menu-item index="/setting">4</el-menu-item>
            <el-menu-item index="/setting">입양후기</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    }
}
</script>

<style scoped>

</style>