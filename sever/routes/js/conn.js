const mysql = require('mysql');//引入musql
//创建连接对象
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'supermarket'//数据库名
})

connection.connect();
console.log('数据库连接成功！');

//暴露模块
module.exports=connection;

