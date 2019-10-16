var doutil = require("./doutil");
function queryAllStudent(success) {
    var querySql = "select * from student";
    var connection = doutil.createConnection();
    connection.connect();
    connection.query(querySql, function (error, result) {
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            throw new Error(error)
        }
    });
    connection.end();
}
function insertStudent(id, stuNum, name, age, stuClass, math, pwd, success) {
    var insertSql = "insert into student(id, stu_num, name, age, class,math, pwd) values (?,?,?,?,?,?,?)";
    var params = [id, stuNum, name, age, stuClass, math, pwd];
    console.log("**params**", params);
    var connection = doutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            throw new Error(error)
        }
    });
    connection.end();
}
function queryStudentByStuNum(stuNum, success) {
    var querySql = "select * from student where stu_num = ?;";
    var params = [stuNum];
    var connection = doutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            throw new Error(error)
        }
    });
    connection.end();
}
module.exports = {
    "queryAllStudent": queryAllStudent,
    "insertStudent": insertStudent,
    "queryStudentByStuNum": queryStudentByStuNum
}