<template>
  <div class="hello">
    <!-- 검색옵션 -->
    <el-row :gutter="20">
      <el-col :span="8">
      <el-select v-model="value" multiple clearable placeholder="Select" style="float: right" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
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
        <el-table :data="items" border style="width: 100%">
        <el-table-column  align="center" label="사진">
            <template slot-scope="scope" class="image-slot">
                <el-image style="width: 200px; height: 200px" :src="scope.row.popfile" lazy>
                </el-image>
            </template>
        </el-table-column>
        <el-table-column  align="center" label="특징">
            <template slot-scope="scope">
                품종: <span>{{scope.row.kindCd}}</span><br>
                성별: <span>{{scope.row.sexCd}}</span><br>
                발견장소: <span>{{scope.row.happenPlace}}</span><br>
                특징: <span>{{scope.row.specialMark}}</span>
            </template>
        </el-table-column>
        <el-table-column  align="center" label="상태"> 
            <template slot-scope="scope">
                   <el-tag
                  :type="scope.row.processState === '보호중' ? 'success' : 'danger'"
                  disable-transitions
                   effect="dark">{{scope.row.processState}}</el-tag>
            </template>
        </el-table-column>
      </el-table>
    </el-row>

  </div>
</template>

<script>
//var convert = require('xml-js');

export default {
    data() {
      return {
        searchword: '',
        items: [],
        options: [{
          value: '417000',
          label: '개'
        }, {
          value: '422400',
          label: '고양이'
        }, {
          value: '429900',
          label: '기타'
        }],
        value: ''
      }
    },
    created(){

      var url = '/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic'; /*URL*/
      const key = 'PizA5duILWkq9mMFf%2Bf9ti3l0fAP1g79ezIZSirAbtMCIcb90puBIJ3qBgcOE8H2RbdBSctpdCHMTASuKhpmbw%3D%3D';
      var queryParams = '?' + encodeURIComponent('serviceKey') + '='+key; /*Service Key*/
      
      this.$http.get(url+queryParams)
      .then((response) => { //ES5로 쓰면 데이터가 담기지 않음.. 출력은 되는데 데이터 담는건 불가 왜 그런지 찾아보기 
        /* var xml = response.data.response.body;
        console.log(xml)
        var json = convert.xml2json(xml, { compact: true })
        this.items = JSON.parse(json) */
        
        this.items = response.data.response.body.items.item
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