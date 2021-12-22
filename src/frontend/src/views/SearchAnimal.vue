<template>
  <div class="hello">
    <!-- 검색옵션 -->
    <el-row :gutter="20">
      <el-col :span="8">
      <el-select v-model="upkind" clearable placeholder="Select" style="float: right" >
        <el-option
          v-for="item in options"
          :key="item.upKindCd"
          :label="item.upKindNm"
          :value="item.upKindCd">
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          format="yyyy-MM-dd"
          value-format="yyyyMMdd">
        </el-date-picker>
      </el-col>
       <el-col :span="8">
      <el-button icon="el-icon-search" style="float: left" circle 
       @click="searchAnimal"></el-button>
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

export default {
    data() {
      return {
        searchword: '',
        items: [],
        options: [],
        upkind: '',
        pickerOptions: {
          shortcuts: [{
            text: 'Last week',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        date: '',
      }
    },
    methods: {
      searchAnimal(){
        var upkind = this.upkind;
        var date = this.date; 

        var bgnde = date[0];
        var endde = date[1];

        if(upkind == ''){
          alert('선택'); 
          return; //함수 빠져나가기
        }
        
        var url = '/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic';
        const key = 'PizA5duILWkq9mMFf%2Bf9ti3l0fAP1g79ezIZSirAbtMCIcb90puBIJ3qBgcOE8H2RbdBSctpdCHMTASuKhpmbw%3D%3D';
        var queryParams = '?' + encodeURIComponent('bgnde') + '=' + bgnde + '&' + encodeURIComponent('endde') + '=' + endde + '&' + encodeURIComponent('upkind') + '=' + upkind
        + '&' + encodeURIComponent('ServiceKey') + '=' + key; 

        console.log(url+queryParams)

        this.$http.get(url+queryParams)
        .then((response) => {
          console.log(response);
          this.items = response.data.response.body.items.item;
        })
        .catch((error) => {
          console.log(error);
        })
      }
    },
    created(){

      //upckind option box data갖고오기
      this.$http.get("http://localhost:8080/api/test2")
      .then((response) => {
        this.options = response.data;
      })
      .catch((error) => {
        console.log(error);
      }) 
    }
  }
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