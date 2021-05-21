import { Request, Response } from 'express';
import { Client } from 'pg';

class DBController {

  async create(request: Request, response: Response) {
    const dataInicial = new Date().getTime();
    
    const client = new Client({
      host:'192.168.99.100',//ip no docker
      port: 5432,
      database: 'nome_do_seu_database',
      password: 'seu_senha',
      user: 'nome_do_seu_usuario'
    });

    await client.connect();

    const { rows } = await client.query('SELECT * FROM cidade');

    const dataFinal = new Date().getTime();

    console.log('O resultado foi', (dataFinal - dataInicial))

    return response.json(rows);  
  }

}

export default new DBController;