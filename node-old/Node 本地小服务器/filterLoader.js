//自动加载
var fs = require("fs");
var globalConfig = require("./config");
// 表示多个拦截器
var filterSet = [];
var pathMap = new Map();
//遍历文件目录  绝对路径
var files = fs.readdirSync(globalConfig["filter_path"]);

for (var i = 0; i < files.length; i++) {
    var temp = require("./" + globalConfig["filter_path"] + "/" + files[i]);
    filterSet.push(temp);
}
module.exports = filterSet;

