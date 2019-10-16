var express = require('express');
var globalConfig = require("./config");
var loader = require("./loader");
var cookie = require("cookie-parser");
var app = new express();
// var studentController = require("./web/studentController")
// __dirname表示的当前文件的绝对路径
app.use(express.static(__dirname + "/" + globalConfig["page_path"]));
app.use(cookie());
// 表示以api为开头的请求  参数含义：请求 响应 拦截成功之后进行什么操作
app.get("/api/*", function (request, response, next) {
    console.log(request.cookies);
    /**
     * 成功之后必须进行后续的操作种类有:
     * 1. next()
     * 2.response.writeHead(404);
     *   response.write("<html><body>404NotFound</body></html>")
     */
    // 有相应的cookie值  就进行next操作  反之重定向
    if (request.cookies.id) {
        next();
    } else {
        response.redirect("/login.html")
    }
    // response.redirect("/login.html");
    // next();
})
// app.get('/queryAllStudent', loader.get("/queryAllStudent"));
loader.init(app);
// app.post()
app.listen(globalConfig["port"])


