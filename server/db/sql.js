const mysql = require('mysql')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'aji1026',
    password : '912016Tb',
    database: 'bookMobileData',
})
module.exports = connection;
