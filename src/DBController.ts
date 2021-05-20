import { Request, Response } from 'express';
import { Client } from 'pg';

class DBController {

  async create(request: Request, response: Response) {
    //const dataInicial = new Date().getTime();
    const client = new Client({
      host:'192.168.99.100',
      port: 5432,
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER
    });

    await client.connect();

    const { rows } = await client.query('SELECT * FROM PHOTOS');

    //const dataFinal = new Date().getTime();

    //console.log('O resultado foi', (dataFinal - dataInicial))

    return response.json(rows);
  }

}

export default new DBController;