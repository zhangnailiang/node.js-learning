var studentService = require("../dao/studentDao")
var url = require("url")
var path = new Map();
function getData(request, response) {
    studentService.queryAllStudent(function (result) {

        var resArr = [];
        result.forEach((item, index) => {
            resArr.push(item.name)
        })
        response.write(resArr.toString());
        response.end();
    })
}
path.set("/getData", getData);

function login(request, response) {
    //GET
    var params = url.parse(request.url, true).query;//解析参数  得到对象
    // studentService.queryStudentByStuNum(params.stuNum, function (result) {
    //     var res = "";
    //     if (result == null || result.length == 0) {
    //         res = "Fail";
    //     } else {
    //         if (result[0].pwd == params.password) {
    //             res = "OK"
    //         } else {
    //             res = "Fail"
    //         }
    //     }

    //     response.write(res);
    //     response.end();
    // })


    // post
    request.on("data", function (data) {
        var stuNum = data.toString().split("&")[0].split("=")[1];
        var password = data.toString().split("&")[1].split("=")[1];
        studentService.queryStudentByStuNum(stuNum, function (result) {
            var res = "";
            if (result == null || result.length == 0) {
                res = "Fail";
                response.writeHead(302, { "location": "/error.html" });
                response.end()
            } else {
                if (result[0].pwd == password) {
                    res = "OK";
                    response.writeHead(302, { "location": "/main.html", "Set-Cookie": "id=" + result[0].id });
                    response.end()
                } else {
                    res = "Fail";
                    response.writeHead(302, { "location": "/error.html" });
                    response.end()
                }
            }
            // response.end();

            // 重定向问题 （前端form表单的跳转问题）
            // 302重定向的跳转是  浏览器来做的
            // response.writeHead(302, { "location": "/main.html" });
            // response.end()
        })
    })
}
path.set("/login", login);
module.exports.path = path;