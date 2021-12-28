<template>
  <div class="hello">
    
    <!-- 종류 검색옵션 -->
    <el-row>
      <el-col>
        종류
        <el-select v-model="upkind" placeholder="Select" @change="upkindToKind" >
          <el-option
            v-for="item in options"
            :key="item.upKindCd"
            :label="item.upKindNm"
            :value="item.upKindCd">
          </el-option>
        </el-select>
        <!-- upkind 클릭시 활성화 -->
        <el-select v-model="kind" placeholder="Select">
          <el-option
            v-for="item in kindlist"
            :key="item.kindCd"
            :label="item.KNm"
            :value="item.kindCd">
          </el-option>
        </el-select>  
      </el-col>
    </el-row>

    <!-- 지역 검색옵션 -->  
    <el-row>
      <el-col>
        지역
        <el-select v-model="locate" placeholder="시도" @change="sidoToSsg" >
          <el-option
            v-for="item in sidolist"
            :key="item.sidoCd"
            :label="item.sidoNm"
            :value="item.sidoCd">
          </el-option>
        </el-select>
        <el-select v-model="locateSub" placeholder="시군구" no-data-text>
          <el-option
            v-for="item in sgglist"
            :key="item.orgCd"
            :label="item.orgdownNm"
            :value="item.orgCd">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
       <el-col>
         검색날짜
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
    </el-row>

    <el-row>
       <el-col>
      <el-button icon="el-icon-search" circle 
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
        locate: '',
        locateSub: '',
        kind: '',
        kindlist: [],
        sidolist: [],
        sgglist: [
          {orgdownNm: "전체",
           orgCd: 0}
        ],
      }
    },
    methods: {
      searchAnimal(){
        var upkind = this.upkind;
        /* var kind = this.kind;
        var locate = this.locate;
        var locateSub = this.locateSub; */
        var date = this.date; 

        var bgnde = date[0];
        var endde = date[1];

        if(upkind == ''){
          alert('선택'); 
          return; //함수 빠져나가기
        }
        
        var url = '/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic';
        var queryParams = '?' + encodeURIComponent('bgnde') + '=' + bgnde + '&' + encodeURIComponent('endde') + '=' + endde + '&' + encodeURIComponent('upkind') + '=' + upkind
        + '&' + encodeURIComponent('ServiceKey') + '=' + this.$key; 

        console.log(url+queryParams)

        this.$http.get(url+queryParams)
        .then((response) => {
          console.log(response);
          this.items = response.data.response.body.items.item;
        })
        .catch((error) => {
          console.log(error);
        }) 
      },
      sidoToSsg(){
        this.locateSub = null; //값 초기화
        var url = '/openapi/service/rest/abandonmentPublicSrvc/sigungu';
        var queryParams = '?' + encodeURIComponent('upr_cd') + '=' + this.locate + '&' + encodeURIComponent('ServiceKey') + '=' + this.$key; 

        this.$http.get(url+queryParams)
        .then((response) => {
          
          if(response.data.response.body.items.item !== undefined) { //값이 없는 경우 undefined로 판별
            this.sgglist = response.data.response.body.items.item;
            this.sgglist.unshift( 
              {orgdownNm: "전체",
               orgCd: 0});
          }
          })
        .catch((error) => {
          console.log(error);
        })
      },
      upkindToKind(){
        this.kind = null; //값 초기화
        var url = '/openapi/service/rest/abandonmentPublicSrvc/kind';
        var queryParams = '?' + encodeURIComponent('up_kind_cd') + '=' + this.upkind + '&' + encodeURIComponent('ServiceKey') + '=' + this.$key; 

        this.$http.get(url+queryParams)
        .then((response) => {
          
          if(response.data.response.body.items.item !== undefined) { //값이 없는 경우 undefined로 판별
            this.kindlist = response.data.response.body.items.item;
            console.log(this.kindlist)
          }
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
      
      //시도 데이터 갖고오기
      this.$http.get("http://localhost:8080/api/sidolist")
      .then((response) => {
        console.log(response)
        this.sidolist = response.data;
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