//Esse arquivo define as configurações do acesso ao banco de dados, ou seja, no databases é como
//eu vou entrar no banco de dados, aqui é onde eu realmente vou me conectar com o banco de dados

import { Sequelize } from 'sequelize'; 
import dotenv from 'dotenv';
import db from './databases'

dotenv.config();

export const sequelize = new Sequelize(
    db.db,
    db.user,
    db.password,
    {
        dialect: 'mysql',
        port: parseInt(db.port)
    }
);