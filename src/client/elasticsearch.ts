import elasticsearch from 'elasticsearch';


function getClient() {
  const client = new elasticsearch.Client({
    host: '192.168.99.100:9200',
    // log: 'trace'
  });

  return client;
}

export default getClient;