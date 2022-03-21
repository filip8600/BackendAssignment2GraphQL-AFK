import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
const { GraphQLDate } = require('graphql-iso-date')
const scalarResolvers = {
  DateTime: GraphQLDate
}

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import * as config from './config';

import pgApiWrapper from './db/pg-api';

async function main() {
  const pgApi = await pgApiWrapper();
  const server = express();
  server.use(cors());
  server.use(morgan('dev'));
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use('/:fav.ico', (req, res) => res.sendStatus(204));

  server.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
  }));


  server.listen(config.port, () => {
    console.log(`Server URL: http://localhost:${config.port}/graphql`);
  });
}

main();