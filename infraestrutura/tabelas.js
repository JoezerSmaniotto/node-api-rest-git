class Tabelas{
    init(conexao){
        this.conexao = conexao // faço isso para repassar a conexão para o escopo, para poder utilizar
        this.criarAtendimento()
    }

    criarAtendimento(){
        const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL
        AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20),
        servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL,
        status varchar(20) NOT NULL,observacoes text, PRIMARY KEY(id))`; 

        this.conexao.query(sql, erro => { 
            // com a const 'sql' passa ele para ser executada
            // como SEGUNDO parametro uma função que vai fazer algo quando a tabela for criada
       
            if(erro){
                console.log(erro) 
            }else{
                console.log('Tabela de Atendimentos criada com sucesso')
            }

        })
    }   
}

module.exports = new Tabelas