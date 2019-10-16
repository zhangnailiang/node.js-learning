//请求资源种类： 静态资源：img css js   动态资源:  处理业务逻辑  数据库等
var http = require("http");

//解析url
var url = require("url");

var globalConfig = require("./config.js");
var fs = require("fs");


//专门服务于动态文件
var loader = require("./loader");
var filterSet = require("./filterLoader")
var log = require("./log.js");

//新建http服务
//底层是net  所以使用的还是net的createServer

//参数是request事件的  监听函数：requestListener  每次HTTP请求  都会触发这个函数 
// console.log(globalConfig)
http.createServer(function (request, response) {
    //request是解析完的数据
    //直接调用其中对象可以直接获得  url，methods等数据  不用解析获取的请求头文件
    var pathName = url.parse(request.url).pathname;//返回的是客户端页面的路径

    // var params = url.parse(request.url).query;//url中路径后面的参数
    var params = url.parse(request.url, true).query;//解析参数  得到对象
    var isStatic = isStaticsRequest(pathName);
    log(pathName);
    for (var i = 0; i < filterSet.length; i++) {
        var flag = filterSet[i](request, response);
        if (!flag) {
            return;
        }
    }
    if (isStatic) {
        //请求静态的数据
        try {
            //绝对路径  注意路径书写
            var data = fs.readFileSync(globalConfig["page_path"] + pathName);
            response.writeHead(200);
            response.write(data);
            response.end();
        } catch (e) {
            response.writeHead(404);
            response.write("<html><body><h1>404 NotFound 错误</h1></body></html>")
            response.end();

        }

    } else {
        //请求动态数据  (非静态数据)
        if (loader.get(pathName) != null) {
            try {
                loader.get(pathName)(request, response);
            } catch (e) {
                response.writeHead(500);
                response.write("<html><body><h1>500 Badserver</h1></body></html>")
                response.end();
            }
        } else {
            response.writeHead(404);
            response.write("<html><body><h1>404 NotFound 错误</h1></body></html>")
            response.end();
        }
    }

}).listen(12308);
log("服务已启动");


//判断请求是否是静态的
function isStaticsRequest(pathName) {
    for (var i = 0; i < globalConfig.static_file_type.length; i++) {
        var temp = globalConfig.static_file_type[i];
        if (pathName.indexOf(temp) == pathName.length - temp.length) {
            return true;
        }
    }
    return false;
}