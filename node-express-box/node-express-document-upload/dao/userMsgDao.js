var doutil = require("./doutil");
function insertUserMsg(name, picPath, originName, picSize, success) {
    var insertSql = "insert into user_msg(name, pic_path, origin_name, pic_size) values (?,?,?,?);";
    var params = [name, picPath, originName, picSize];
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
module.exports = {
    "insertUserMsg": insertUserMsg,
}