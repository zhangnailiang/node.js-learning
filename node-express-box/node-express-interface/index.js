var express = require('express');
var globalConfig = require("./config");
var loader = require("./loader");

var app = new express();
// var studentController = require("./web/studentController")
// __dirname表示的当前文件的绝对路径
app.use(express.static(__dirname + "/" + globalConfig["page_path"]));
// app.get('/queryAllStudent', loader.get("/queryAllStudent"));
loader.init(app);
// app.post()
app.listen(globalConfig["port"])


