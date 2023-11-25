import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const port = process.env.PORT || 4001;

const createApp = async (): Promise<void> => {
  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    introspection: true,
  });

  server.listen({ port });
  console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
};

createApp();
