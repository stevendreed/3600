// schema.js
const { gql } = require("apollo-server-express");
const { User, Message, Chatroom } = require("../models");

const typeDefs = gql`
  type Query {
    user: User
    messages(_id: ID!): [Message]
    chatrooms: [Chatroom]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addMessage(
      sender: String!
      message_id: UUID!
      content: String!
      thread: UUID!
      location: UUID!
    ): Message
    updateUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Message {
    _id: ID
    sender: String
    message_id: UUID
    content: String
    reaction: json
    thread: UUID
    location: UUID
  }
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
