<template>
    <div>{{sgglist}}</div>
</template>
<script>
export default {
    data(){
        return {
            sidolist: [],
            sgglist: []
        }
    },
    methods: {

    },
    created() {
        var url = '/openapi/service/rest/abandonmentPublicSrvc/sigungu';
        var queryParams = '';

        this.$http.get("http://localhost:8080/api/sidolist")
        .then((response) => {
            this.sidolist = response.data;

            for(var item in this.sidolist){
                queryParams = '?' + encodeURIComponent('upr_cd') + '=' + this.sidolist[item].sidoCd + '&' + encodeURIComponent('ServiceKey') + '=' + this.$key; 
                console.log(this.sidolist[item].sidoCd)
                this.$http.get(url+queryParams)
                .then((response) => {
                
                    if(response.data.response.body.items.item !== undefined) { //값이 없는 경우 undefined로 판별
                        this.sgglist = response.data.response.body.items.item;
                        this.sgglist.unshift( 
                        {orgdownNm: "전체",
                        orgCd: 0});
                        
                    }else{
                        this.sgglist = {
                            orgdownNm: "전체",
                        orgCd: 0};
                    }
                    
                    //여기서 orgdownNm, orgCd, uprCd 그걸 insert 
                })
                .catch((error) => {
                console.log(error);
                })
            }    
        })
        .catch((error) => {
            console.log(error);
        }) 
        
        /* var url = '/openapi/service/rest/abandonmentPublicSrvc/sigungu';
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
        }) */
    }
}
</script>
<style scoped>

</style>