<template>
  <div class="hello">
    <!-- 검색옵션 -->
    <el-row :gutter="20">
      <el-col :span="8">
      <el-select v-model="value" multiple clearable placeholder="Select" style="float: right" >
        <el-option
          v-for="item in items"
          :key="item.orgCd"
          :label="item.orgdownNm"
          :value="item.orgCd">
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="8">
      <el-input placeholder="Please Input" v-model="searchword"> 
      </el-input>
      </el-col>
       <el-col :span="8">
      <el-button icon="el-icon-search" style="float: left" circle ></el-button>
      </el-col>
    </el-row>

     <!-- 테이블 -->
    <el-row>
        <!-- <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="종류"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="색상"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="주소">
        </el-table-column>
      </el-table> -->
    </el-row>

  </div>
</template>

<script>
export default {
    data() {
      return {
        searchword: '',
        items: [],
        value: '',
      }
    },
    created(){
      var url = '/openapi/service/rest/abandonmentPublicSrvc/sido';
      //var url = '/openapi/service/rest/abandonmentPublicSrvc/shelter?upr_cd=6110000&org_cd=3220000'; /*URL*/
      const key = 'PizA5duILWkq9mMFf%2Bf9ti3l0fAP1g79ezIZSirAbtMCIcb90puBIJ3qBgcOE8H2RbdBSctpdCHMTASuKhpmbw%3D%3D';
      var queryParams = '&' + encodeURIComponent('ServiceKey') + '='+key; /*Service Key*/
      
      /*parameter */
      //var upr_cd = 0; //시도코드	7	1	6110000	시도코드(입력 시 데이터 O, 미입력 시 데이터 X)
      //ar org_cd = 0; //시군구코드	7	1	3220000	시군구코드(입력 시 데이터 O, 미입력 시 데이터 X)


      this.$http.get(url+queryParams)
      .then((response) => { //ES5로 쓰면 데이터가 담기지 않음.. 출력은 되는데 데이터 담는건 불가 왜 그런지 찾아보기 
        this.items = response.data.response.body.items
        console.log(this.items)
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  /*  
  URI 조회
  http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=서비스키

  -- request message
  bgnde 검색시작일 YYYYMMDD
  endde 검색종료일 YYYYMMDD
  upkind 축종코드 개, 고양이, 기타(아까 그 코드)
  kind 품종
  upr_cd 시도코드
  org_cd 시군구코드
  care_reg_no 보호소번호
  pageNo 페이지번호
  numOfRows 페이지당 보여줄 개수

  --
  */
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>