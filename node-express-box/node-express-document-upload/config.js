var fs = require("fs");
var globalConfig = {};
var conf = fs.readFileSync(__dirname + "/server.conf");
var configArr = conf.toString().split("\n");
configArr.forEach((item, index) => {
    globalConfig[item.split("=")[0]] = item.split("=")[1].trim();

})
console.log(globalConfig)
module.exports = globalConfig