import { gql } from 'apollo-server-core';

import { typeDefs as sideDishTypeDefs } from './sideDish.schema';

import { typeDefs as brokenRiceTypeDefs } from './brokenRice.schema';

const scalarSchema = gql`
  scalar ObjectID
  scalar Long
`;

const typeDefs = gql`
  ${scalarSchema}
  ${sideDishTypeDefs}
  ${brokenRiceTypeDefs}
`;

export { typeDefs };
