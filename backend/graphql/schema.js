// schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    // Define your queries here
  }

  type Mutation {
    // Define your mutations here
  }

  // Define other types here
`;

const resolvers = {
  Query: {
    // TODO: implement query resolvers
  },
  Mutation: {
    // TODO: implement mutation resolvers
  },
};

module.exports = { typeDefs, resolvers };
