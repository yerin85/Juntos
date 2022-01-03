<template>
  <div class="hello">
    
    <!-- search start -->
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
          range-separator="~"
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
    <!-- search end -->
    <!-- table start -->
    <el-row>
        <el-table :data="items" border style="width: 100%" >
        <el-table-column  align="center" label="사진">
            <template slot-scope="scope" class="image-slot">
                  <router-link :to="{name: 'DetailAnimal', params: { desertionNo: scope.row.desertionNo}}">  
                  <el-image style="width: 200px; height: 200px" :src="scope.row.popfile" lazy>
                  </el-image>
                  </router-link>
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
      <!-- table end -->
      <el-pagination
        :page-size="10"
        layout="prev, pager, next"
        :total="this.pageNo"
        @current-change="searchAnimal">
      </el-pagination>
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
        pageNo: 0,
        total: '',
        page: '',
      }
    },
    methods: {
      /* 조건검색*/
      searchAnimal(val){
        window.scrollTo(0, 0); //상단이동

        if(val !== PointerEvent){ //페이지 번호 세팅
          this.page = val;
        }else{
          this.page = 1;
        }
        /* var upkind = this.upkind;
        var kind = this.kind;
        var locate = this.locate;
        var locateSub = this.locateSub; */
        var date = this.date; 

        var bgnde = date[0];
        var endde = date[1];

        var url = '/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic';
        var queryParams = '?' + encodeURIComponent('bgnde') + '=' + bgnde + '&' + encodeURIComponent('endde') + '=' + endde

        // 검증
        // upkind - kind, locate - locateSub 
        if(this.upkind !== ''){
          queryParams += '&' + encodeURIComponent('upkind') + '=' + this.upkind;
          if(this.kind == null){
             //
          }else{
            queryParams += '&' + encodeURIComponent('kind') + '=' + this.kind;
          }
        }

        if(this.locate !== ''){
          queryParams += '&' + encodeURIComponent('upr_cd') + '=' + this.locate;
          if(this.locateSub == null){
            //
          }else{
            queryParams += '&' + encodeURIComponent('org_cd') + '=' + this.locateSub;
          }
        }
        
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + this.page
        + '&' + encodeURIComponent('numOfRows') + '=' + 10
        + '&' + encodeURIComponent('ServiceKey') + '=' + this.$key 

        console.log(url+queryParams)

        this.$http.get(url+queryParams)
        .then((response) => {
          this.pageNo = response.data.response.body.totalCount / 10;
          this.items = response.data.response.body.items.item;
          console.log(this.items)
        })
        .catch((error) => {
          console.log(error);
        }) 
      },
      /* 시도 selectbox 선택시 시군구 selectbox 활성화 */
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
      /* 축종 selectbox 선택시 품종 selectbox 활성화 */
      upkindToKind(){
        this.kind = null; //값 초기화
        var url = '/openapi/service/rest/abandonmentPublicSrvc/kind';
        var queryParams = '?' + encodeURIComponent('up_kind_cd') + '=' + this.upkind + '&' + encodeURIComponent('ServiceKey') + '=' + this.$key; 

        this.$http.get(url+queryParams)
        .then((response) => {
          
          if(response.data.response.body.items.item !== undefined) { //값이 없는 경우 undefined로 판별
            this.kindlist = response.data.response.body.items.item;
          }
          })
        .catch((error) => {
          console.log(error);
        })
      }

    },
    created(){

      /* 축종 데이터 갖고오기 */
      this.$http.get("http://localhost:8080/api/upkindlist")
      .then((response) => {
        this.options = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      
      /* 시도 데이터 갖고오기 */
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