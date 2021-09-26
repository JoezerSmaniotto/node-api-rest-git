const customExpress = require ('./config/customExpress')
const  conexao = require('./infraestrutura/conexao')
const  Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro =>{
    if(erro){
        console.log(erro)
    }else{
        console.log('Conectado com sucesso')
        Tabelas.init(conexao) // inicar as tabelas 
        const app = customExpress()
        app.listen(3000,()=> console.log('Servidor rodando na porta 3000'))
        // Define  a porta que o servidoer irá rodar
    }
})


