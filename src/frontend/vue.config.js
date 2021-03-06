const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, "../main/resources/static") //배포 후 파일을 생성할 경로
    ,indexPath: "../static/index.html"  //outputDir기준으로 index파일의 위치를 지정
    
    ,devServer: {
        proxy:{
            '/api':{ ///api로 들어오면 스프링서버로 보냄
                target: 'http://localhost:8091', //vue dev서버에서 localhost:8080/api로 오는 요청을 받으면 localhost:8090/api를 향해 다시 해당 요청을 다시 쏴줌
                changeOrigin: true,
            },
            '/':{
                target: 'http://openapi.animal.go.kr',
                pathRewrite: {'^/': ''},
                changeOrigin: true,
                secure: false
            }
        }
    }
    ,
}