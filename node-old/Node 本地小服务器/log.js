
//日志文件  log 日志的处理文件  
var fs = require("fs");
var globalConfig = require("./config");
//三个参数 （地址， 写入内容， 回调函数）
var filename = ("./" + globalConfig["log_path"] + "/" + globalConfig.log_name);


//异步执行的文件创建和写入  就是用另外一个线程执行函数
//两个操作没有必然联系  进行  异步操作
// fs.writeFile(filename, "asd", function () {});

//同步执行  就是 阻塞加载js文件
// fs.writeFileSync(filename, "asd");
function log(data) {
    //appendFile的option默认是  flag: "a"
    // fs.appendFile(filename, data + "\n", function () {});



    //writeFile  源码中  所有的 使用异步的写法
    fs.writeFile(filename, data + "\n", { flag: "a" }, function () { });
}
module.exports = log;