var express = require('express');
var globalConfig = require("./config");
var app = new express();
// __dirname表示的当前文件的绝对路径
app.use(express.static(__dirname + "/" + globalConfig["page_path"]));
app.listen(globalConfig["port"])


