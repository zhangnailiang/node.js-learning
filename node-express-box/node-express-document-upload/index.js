var express = require('express');
var globalConfig = require("./config");
var loader = require("./loader");
var cookie = require("cookie-parser");
//引入multer模块
var multer = require("multer");
var userMsgDao = require("./dao/userMsgDao")
var app = new express();
// var studentController = require("./web/studentController")
// __dirname表示的当前文件的绝对路径
app.use(express.static(__dirname + "/" + globalConfig["page_path"]));
app.use(cookie());
// 表示以api为开头的请求  参数含义：请求 响应 拦截成功之后进行什么操作


/**
 * 配置multer实例
 */
var uploadSingle = multer({
    //指示文件的存放路径
    dest: "./file"
})
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
app.post("/upload", uploadSingle.single("file"), function (request, response) {
    console.log(request.file.originalname);
    console.log(request.file.size);
    console.log(request.file.path);
    console.log(request.body.name);
    // 两种传参的方式
    // 1. 拼接在url后面，将request.url转为url对象，找到query属性，拿到参数
    // 2. 放在form表单里，request的数据体（body）传上来的。request.body.xxx
    /**
     * 上传一个用户信息
     * 用户名，用户头像
     * 头像图片存放在某个路径下
     * 数据库中存 用户名，用户头像的路径
     */
    userMsgDao.insertUserMsg(request.body.name, request.file.path, request.file.originalname, request.file.size, function (result) {
        var resp = {
            path: request.file.path,
        }
        response.writeHead(200);
        response.write(JSON.stringify(resp));
        response.end();
    })

})
app.listen(globalConfig["port"])


