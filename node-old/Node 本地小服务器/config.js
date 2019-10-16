var fs = require("fs");
var globalConfig = {};

//异步的读取文件  一般不使用  因为往往需要异步读取文件之后 使用读取的文件 一般使用同步的文件
var conf = fs.readFileSync("./server.conf");
var configArr = conf.toString().split("\r\n");


for (var i = 0; i < configArr.length; i++) {
    globalConfig[configArr[i].split("=")[0]] = configArr[i].split("=")[1];
}

if (globalConfig.static_file_type) {
    globalConfig.static_file_type = globalConfig.static_file_type.split("|");

} else {
    throw new Error("配置文件异常,缺少static_file_type");

}
module.exports = globalConfig;