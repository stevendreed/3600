// schema.js
const { gql } = require("apollo-server-express");
const { User, Message, Chatroom } = require("../models");

const typeDefs = gql`
  type Query {
    user: User
    messages(chatroomId: ID!): [Message]
    chatrooms: [Chatroom]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addMessage(sender: ID!, content: String!, thread: ID, location: ID!): Message
    updateUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
  }

  type User {
    _id: ID
    username: String
  }

  type Message {
    _id: ID
    sender: User
    content: String
    reaction: String
    thread: ID
    location: Chatroom
  }

  type Chatroom {
    _id: ID
    title: String
    tags: [Tag]
    icon: String
    activeUsers: [User]
    createdAt: String
  }

  type Tag {
    _id: ID
    name: String
  }

  type Auth {
    token: String
    user: User
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
