const Atendimento = require('../models/atendimento')

module.exports = app => { // aqui recebo o app que passo na custom express na linha 10 no consign
                          // consign().include('controllers').into(app)  
    app.get('/atendimentos',(req,res)=> { // o req não recebo nada, pq quero apenas listar.
        Atendimento.lista(res)
    })

    app.get('/atendimentos/:id',(req,res)=> { // o "/:" é o parametro. e o "id" é3 nome do parametro
        const id = parseInt(req.params.id) // convert Um inteiro pq ele vem com String
        // Com o req.params é como tenho acesso aos paramtros enviados na requisição, como quero
        // Pegar o ID  coloco req.params.id
        Atendimento.buscaPorId(id,res)
    })

    app.post('/atendimentos',(req,res)=> { 
        const  atendimento  = req.body // pega o corpo com os Dados informados.  
        Atendimento.adiciona(atendimento, res)
    })

    app.patch('/atendimentos/:id',(req,res)=> { // o "/:" é o parametro. e o "id" é3 nome do parametro
        const id = parseInt(req.params.id) // convert Um inteiro pq ele vem com String
        // Com o req.params é como tenho acesso aos paramtros enviados na requisição, como quero
        // Pegar o ID  coloco req.params.id
        const valores = req.body // Pega o corpo da requisão.

        Atendimento.altera(id, valores,res)
    })

    app.delete('/atendimentos/:id',(req,res)=> { // o "/:" é o parametro. e o "id" é3 nome do parametro
        const id = parseInt(req.params.id) // convert Um inteiro pq ele vem com String
        // Com o req.params é como tenho acesso aos paramtros enviados na requisição, como quero
        // Pegar o ID  coloco req.params.id
        Atendimento.delete(id,res)
    })



}
