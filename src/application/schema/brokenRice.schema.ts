import { gql } from 'apollo-server';

const typeDefs = gql`
  type BrokenRice {
    id: ObjectID!
    name: String!
    description: String!
    sideDishes: [SideDish!]!
    imgSrc: String!
    priceCents: Int!
  }

  type Query {
    brokenRices: [BrokenRice!]!
    brokenRicePage(limit: Int!, cursor: String, totalCount: Int): BrokenRiceResponse
  }

  input BrokenRiceQueryArgs {
    id: ObjectID!
  }

  type Mutation {
    createBrokenRice(input: CreateBrokenRiceInput!): BrokenRice!
    deleteBrokenRice(input: DeleteBrokenRiceInput!): ObjectID!
    updateBrokenRice(input: UpdateBrokenRiceInput!): BrokenRice!
  }

  input CreateBrokenRiceInput {
    name: String!
    description: String!
    imgSrc: String!
    sideDishIds: [ObjectID!]!
  }

  input DeleteBrokenRiceInput {
    id: ObjectID!
  }

  input UpdateBrokenRiceInput {
    id: ObjectID!
    name: String
    description: String
    imgSrc: String
    sideDishIds: [ObjectID]
  }

  type BrokenRiceResponse {
    brokenRices: [BrokenRiceDocument]
    connection: BrokenRiceConnection
  }

  type BrokenRiceConnection {
    cursor: String
    totalCount: Int
    hasNextPage: Boolean
  }

  type BrokenRiceDocument {
    id: String!
    name: String!
    description: String!
    sideDishes: [SideDish!]!
    imgSrc: String!
    priceCents: Int!
  }
`;
export { typeDefs };
