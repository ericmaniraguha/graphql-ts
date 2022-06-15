import 'reflect-metadata';
import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TaskResolver } from './resolvers/task';

const main = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
  });

  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  app.get('/', (_req, res) => res.send('Hello World'));

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
};

main().catch((err) => console.error(err));

console.log('Here');
