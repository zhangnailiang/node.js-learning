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
    console.log("**params1**", params);
    // studentDao.insertStudent([...params])
    studentDao.insertStudent(params.id, params.stuNum, params.name, params.age, params.stuClass, params.math, params.pwd, function () {
        response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
        response.write("添加成功");
        response.end
    })


}
path.set("/queryAllStudent", getAllStudent);
path.set("/insertStudent", insertStudent);

module.exports.path = path;