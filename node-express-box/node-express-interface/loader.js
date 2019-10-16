var fs = require("fs");
var globalConfig = require("./config");
var controllerSet = [];
var pathMap = new Map();
function init(app) {
    // var files = fs.readdirSync(globalConfig["web_path"]);
    var files = fs.readdirSync(__dirname + "/" + globalConfig["web_path"]);

    console.log("files", files.toString())
    for (var i = 0; i < files.length; i++) {
        var temp = require("./" + globalConfig["web_path"] + '/' + files[i]);
        if (temp.path) {
            for (var [key, value] of temp.path) {
                if (pathMap.get(key) == null) {
                    pathMap.set(key, value);
                    app.get(key, value)
                } else {
                    throw new Error("url path异常， url:" + key)
                }
                controllerSet.push(temp)
            }
        }
    }
}
module.exports.init = init;