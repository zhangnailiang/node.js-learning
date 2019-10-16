var net = require("net");
var fs = require("fs");
// var globalConf = require("./conf");
// var data = fs.readFileSync(__dirname + "/index.html");
// console.log (data.toString())
var server = net.createServer();
server.listen(12307, "127.0.0.1");
server.on("listening", function () {
    console.log("服务起启动");
})

server.on("connection", function (socket) {
    socket.on("data", function (data) {
        console.log (data.toString())
        var url = data.toString().split("\r\n")[0].split(" ")[1];
        console.log(url)
        try {
            var dataFile = fs.readFileSync(__dirname + url); ///相对路径
            socket.write("HTTP/1.1 200OK\r\n\r\n");
            //读取的是img的html代码 不能是字符串  也不能拼接在字符串后面
            console.log("111");
            socket.write (dataFile);
        } catch (e) {

            socket.write("HTTP/1.1 400NotFound\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>" + data.toString);
        }

    })

    // })
})