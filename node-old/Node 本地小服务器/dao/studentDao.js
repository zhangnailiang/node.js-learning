var dbutil = require("./dbutil");
function queryAllStudent(success) {
    var querySql = "select * from student ;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function (err, result) {
        if (err == null) {
            success(result);
        } else {
        }
    })
    // 执行关闭
    connection.end();
}
function queryStudentByClassAndAge(classNum, age, success) {
    // 这种情况会有sql注入
    // var querySql = "select * from student where class = " + classNum + ";";

    // 使用？的方式
    var querySql = "select * from student where class = ? and age = ? ;";
    var queryParams = [classNum, age];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, queryParams, function (err, result) {
        if (err == null) {
            success(result);
        } else {
            console.log(err)
        }
    })
    // 执行关闭
    connection.end();
}
function queryStudentByStuNum(stuNum, success) {
    var querySql = "select * from student where stu_num = ?;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, stuNum, function (err, result) {
        if (err == null) {
            success(result);
        } else {
            console.log(err)
        }
    })
    connection.end();

}
module.exports = {
    "queryAllStudent": queryAllStudent,
    "queryStudentByClassAndAge": queryStudentByClassAndAge,
    "queryStudentByStuNum": queryStudentByStuNum
}