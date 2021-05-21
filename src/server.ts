import express, { Request, Response } from 'express';
import getClient from './client/elasticsearch';
import DBController from './DBController';
import CidadeController from './CidadeController';

const app = express();

app.get('/', async (request: Request, response: Response) => {

  const client = getClient();

  // Criar um registro no elasticsearch
  const result = await client.index({
    index: 'elastic_teste',
    type: 'type_elastic_teste',
    body: {
      user: 'Daniele',
      password: 'sd8234udf',
      email: 'dani.leao89@gmail.com'
    }
  });

  // Fazer uma busca

  return response.json(result);
})

app.get('/db/create', DBController.create)
app.get('/cidades/create', CidadeController.create)
app.get('/cidades/findAll', CidadeController.findAll)
app.get('/cidades/findById/:id', CidadeController.findById)


app.listen(3333, () => console.log('Running'));