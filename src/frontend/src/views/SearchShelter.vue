<template>
  <div class="hello">
    <!-- 검색옵션 -->
    <div id="map"></div>
    <el-row>
      <el-col>
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
        <p> {{locate}}//// {{locateSub}}</p>  
      </el-col>
    </el-row>

    <el-row :gutter="20">
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
        locate: '',
        locateSub: '',
        sidolist: [],
        sgglist: [
          {orgdownNm: "전체",
           orgCd: 0}
        ],
      }
    },
    created(){
      this.$http.get("http://localhost:8080/api/sidolist")
      .then((response) => {
        console.log(response)
        this.sidolist = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    methods: {
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
      initMap() {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 5,
        };
        this.map = new kakao.maps.Map(container, options);
      }
    },
    mounted() {
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=db5715be56a04ae7aa26b2b026e609b3";
        document.head.appendChild(script);
    }
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

  #map {
    width: 400px;
    height: 400px;
  }
</style>