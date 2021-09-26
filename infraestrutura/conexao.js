const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'root', // testesenha
    database:'test_db',
    insecureAuth : true,
})

module.exports = conexao