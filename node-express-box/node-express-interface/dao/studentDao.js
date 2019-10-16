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
module.exports = {
    "queryAllStudent": queryAllStudent
}