//Esse aquivo define o acesso ao banco de dados, ou seja, se for para produção ele se conecta ao 
//banco de dados de produção, mas se for para teste, ele se concecta ao banco de dados de teste

import dotenv from "dotenv";
dotenv.config()

let db = {
    //Essa linha define um objeto db com as configurações do banco de dados para o ambiente de produção. Aqui, as propriedades do objeto db são definidas com os valores das variáveis de ambiente correspondentes.
    db: process.env.PG_DB as string,
    user: process.env.PG_USER as string,
    password: process.env.PG_PASSWORD as string,
    port: process.env.PG_PORT as string
}

if (process.env.NODE_ENV === 'test') {
    db = {
        //Essas linhas verificam se o ambiente é de teste. Se for, então o objeto db é redefinido com as configurações do banco de dados para o ambiente de teste.
        db: process.env.TEST_DB as string,
        user: process.env.TEST_USER as string,
        password: process.env.TEST_PASSWORD as string,
        port: process.env.TEST_PORT as string
    }
}

export default db