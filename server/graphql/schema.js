// schema.js
const { gql } = require('apollo-server-express');
const { User, Message, Chatroom } = require('../models');

const typeDefs = gql`
  type Query {
    user: User
    messages(chatroomId: ID!): [Message]
    chatrooms: [Chatroom]
  }

  type Mutation {
    LOGIN_USER(email: String!, password: String!): Auth
    ADD_USER(username: String!, email: String!, password: String!): Auth
    UPDATE_USER(username: String!, email: String!, password: String!): User
    ADD_MESSAGE(sender: ID!, content: String!, thread: ID, location: ID!): Message
    ADD_CHATROOM(title: String!, tagIds: [ID!], icon: String): Chatroom
  }

  type User {
    _id: ID
    username: String
    recentChatrooms: [Chatroom]
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
    user: async (_, args) => {
      return await User.findById(args.id);
    },
    messages: async (_, { chatroomId }) => {
      return await Message.find({ location: chatroomId });
    },
    chatrooms: async () => {
      return await Chatroom.find({}).populate('tags');
    },
  },
  Mutation: {
    LOGIN_USER: async (_, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user || !await user.isCorrectPassword(password)) {
        throw new Error('Invalid credentials');
      }
      const token = // jwt token here
      return { token, user };
    },
    ADD_USER: async (_, { username, email, password }, context) => {
      const newUser = new User({ username, email, password });
      await newUser.save();
      const token = // jwt token here
      return { token, user: newUser };
    },
    UPDATE_USER: async (_, { username, email, password }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { email, password },
        { new: true }
      );
      return updatedUser;
    },
    ADD_MESSAGE: async (_, { sender, content, thread, location }, context) => {
      const newMessage = new Message({ sender, content, thread, location });
      await newMessage.save();
      return newMessage;
    },
    ADD_CHATROOM: async (_, { title, tagIds, icon }, context) => {
      for (const tagId of tagIds) {
        const tagExists = await Tag.exists({ _id: tagId });
        if (!tagExists) {
          throw new Error(`Tag not found: ${tagId}`);
        }
      }
      const newChatroom = new Chatroom({ title, tags: tagIds, icon });
      await newChatroom.save();
      return newChatroom;
    },
  },
};

module.exports = { typeDefs, resolvers };
