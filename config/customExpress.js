const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () => {
    const app = express() // Pegou o App, 

    app.use(bodyParser.urlencoded({extended: true}))// Usado para ler os dados do post
    app.use(bodyParser.json())// Usado para ler os dados do post
    consign().include('controllers').into(app)// Configura o app
    return app // Retorna o App configurado
}
