import { gql } from 'apollo-server';

const typeDefs = gql`
  type SideDish {
    id: ObjectID!
    name: String!
    priceCents: Int!
  }

  type Query {
    sideDishes: [SideDish!]!
  }

  input SideDishQueryArgs {
    id: ObjectID!
  }

  type Mutation {
    createSideDish(input: CreateSideDishInput!): SideDish!
    deleteSideDish(input: DeleteSideDishInput!): ObjectID!
    updateSideDish(input: UpdateSideDishInput!): SideDish!
  }

  input CreateSideDishInput {
    name: String!
    priceCents: Int!
  }

  input DeleteSideDishInput {
    id: ObjectID!
  }

  input UpdateSideDishInput {
    id: ObjectID!
    name: String
    priceCents: Int
  }
`;

export { typeDefs };
