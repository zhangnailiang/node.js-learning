//自动加载
var fs = require("fs");
var globalConfig = require("./config");
var controllerSet = [];
var pathMap  = new Map();
//遍历文件目录  绝对路径
var files = fs.readdirSync(globalConfig["web_path"]);

for (var i = 0; i < files.length; i++) {
    var temp = require("./" + globalConfig["web_path"] + "/" + files[i]);
    if (temp.path) {
        for (var [k, v] of temp.path) {
            //判断shi
            if (pathMap.get(k) == null) {
                pathMap.set(k, v);
            } else {
                console.log ("异常");
                throw new Error ("url path异常, url:" + key);
            }
            controllerSet.push(temp);
        }

    }
}
module.exports = pathMap;

