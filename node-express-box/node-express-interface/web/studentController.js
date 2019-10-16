var studentDao = require("../dao/studentDao");
var url = require("url");
var path = new Map();
function getAllStudent(request, response) {
    studentDao.queryAllStudent(function (result) {
        response.writeHead(200);
        response.write(JSON.stringify(result));
        response.end();
    })
}
function insertStudent(request, response) {
    var params = url.parse(request.url, true).query;
    // studentDao.insertStudent([...params])
    studentDao.insertStudent(params.id, params.stuNum, params.name, params.age, params.stuClass, params.math, params.pwd, function () {
        response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
        response.write("添加成功");
        response.end
    })


}
function login(request, response) {
    var params = url.parse(request.url, true).query;
    studentDao.queryStudentByStuNum(params.stuNum, function (result) {
        if (result && result.length > 0 && result[0].pwd == params.pwd) {
            //写cookie

            response.cookie("id", result[0].id);
            response.redirect("/api/getAllStudent")
        } else {
            response.redirect("/error.html");
        }
    })
}
path.set("/api/queryAllStudent", getAllStudent);
path.set("/api/insertStudent", insertStudent);
path.set("/login", login);
module.exports.path = path;