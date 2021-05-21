import { Request, Response } from 'express';
import { Client } from 'pg';
import getClient from './client/elasticsearch';

class CidadeController {

  async create(request: Request, response: Response) {
    
    const client = new Client({
      host:'192.168.99.100',//ip no docker
      port: 5432,
      database: 'nome_do_seu_database',
      password: 'seu_senha',
      user: 'nome_do_seu_usuario'
    });

    await client.connect();

    const { rows } = await client.query('SELECT * FROM cidade');

    for await(let row of rows) {
      await getClient().index({
        index: 'cidades',
        type: 'type_cidades',
        body: row
      }, (erro) => {
        if(erro) {
          return response.status(400).json({error: erro})
        }
      })
    }
   
    return response.json({ message: 'Index ok! '});
  }

  async findAll(request: Request, response: Response) {
    
    const dataInicial = new Date().getTime();

    const data = await getClient().search({
      index: 'cidades',
      size: 6000
    })

    const dataFinal= new Date().getTime();

    console.log('O resultado do elasticsearch foi', (dataFinal - dataInicial));

    return response.json(data);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const data = await getClient().search({
      index: 'cidades',
      q: `id:${id}`
    });

    return response.json(data.hits.hits);
  }

}

export default new CidadeController;