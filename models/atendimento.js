const moment  = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = new moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = {...atendimento, dataCriacao, data}
        // validação
        const dataEhValida =  moment(data).isSameOrAfter(dataCriacao)
        console.log(` ${data}  --- ${dataCriacao}`)
        const clienteEhValido = atendimento.cliente.length >=5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Nome do cliente deve ter pelo menos cinco caracteres'
            }
        ]
        
        // DESTA FORM SÓ DEIXA CRIAR SE NÃO TIVER ERRO
        const erros =  validacoes.filter(campo =>  !campo.valido)
        const existemErros = erros.length
        if(existemErros){
            res.status(400).json(erros)
       
        }else{
            const sql = 'INSERT INTO Atendimentos SET ?'  
            // A '?' vai pegar o que o o cliente passar, e vai inserir na tabela.
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                // 1 parametro o sql 
                // 2 parametro NESTE caso é obj que estou salvando, mas posso passar varias coisas.
                // 3 parametro Função que tem dois parametros dentro, o erro e o resultados.
                // O ERRO vai retornar o erro, se acontecer algum na persistencia dos dados...
                // Já o resultado é as infomrações que são retornar ao dar sucesso na persistencia dos dados.
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimentoDatado)
                }
            })
            
        }

    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos'
        
        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos where id=${id}`
        
        conexao.query(sql, (erro, resultados)=>{
            const atendimento = resultados[0] // Fiz isso pq estava retornando um array de obj,
            // nesta caso com um apenas. Agora detorno apenas o obj
            if(erro){
                res.status(400).json(erro)
            }else{

                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data =  moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        }

        const sql = `UPDATE Atendimentos SET ? where id=?`
        
        conexao.query(sql,[valores,id] ,(erro, resultados)=>{
 
            if(erro){
                res.status(400).json(erro)
            }else{

                res.status(200).json({...valores,id})
            }
        })
    }

    delete(id, res){
      
        const sql = `DELETE FROM Atendimentos where id=?`
        
        conexao.query(sql,id ,(erro, resultados)=>{
 
            if(erro){
                res.status(400).json(erro)
            }else{

                res.status(200).json({id}) // Poderia retornar o resultado mas retornaria 
                //informações que não são uteis para o usuário, nesta caso caso, é melhor 
                //retornar o ID para usuário saber que foi deletado.

            } 
        })
    }
}

module.exports = new Atendimento