import { User } from "../models/User";
import bcrypt from "bcrypt";
//O código define várias funções para gerenciar usuários em uma aplicação, incluindo criação, busca, verificação de senha, listagem de todos os usuários e exclusão. Vamos dividir o código em partes para facilitar a compreensão.
//é aqui que fica as funções de fato
export const createUser = async (email: string, password: string) => {
  const hasUser = await User.findOne({ where: { email } });
  if (!hasUser) {
    let hash = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      email,
      password: hash,
    });
    return newUser;
  } else {
    return new Error("Email já existe");
  }
};
//verifia se tem um email no banco 
export const findByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

//Verificar se uma senha fornecida (passwordText) corresponde a uma senha criptografada armazenada (encrypted).
export const matchPassword = async (
  passwordText: string,
  encrypted: string
) => {
  return bcrypt.compareSync(passwordText, encrypted);
};

//Recuperar e retornar todos os usuários da tabela User.
export const all = async () => {
  return await User.findAll();
};

export const deleteUser = async (email: string)=>{
  try {
    const deleteUser = await User.destroy({where: {email}})
    if(deleteUser){
      return true
    }else{
      return false
    }
  } catch (error) {
    throw new Error("erro ao excluir o usuário")
  }
}

