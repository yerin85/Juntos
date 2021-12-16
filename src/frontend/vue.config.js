const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, "../main/resources/static")
    ,indexPath: "../static/index.html"  
    ,devServer: {
        proxy: "http://localhost:8080"
    }
    ,
}