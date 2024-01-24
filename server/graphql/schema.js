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
    login(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, email: String!, password: String!): User
    addMessage(sender: ID!, content: String!, thread: ID, location: ID!): Message
    updateMessage(messageId: ID!, content: String!): Message
    addChatroom(title: String!, tagIds: [ID!], icon: String): Chatroom
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
  // query resolvers
  Query: {
    // fetch a user by ID
    user: async (_, args) => {
      return await User.findById(args.id);
    },
    // fetch messages for a specific chatroom
    messages: async (_, { chatroomId }) => {
      return await Message.find({ location: chatroomId });
    },
    // fetch all chatrooms
    chatrooms: async () => {
      return await Chatroom.find({}).populate('tags');
    },
  },
  // mutation resolvers
  Mutation: {
    // user login
    login: async (_, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user || !await user.isCorrectPassword(password)) {
        throw new Error('Invalid credentials');
      }
      const token = // jwt token here
      return { token, user };
    },
    // add a new user
    addUser: async (_, { username, email, password }, context) => {
      const newUser = new User({ username, email, password });
      await newUser.save();
      const token = // jwt token here
      return { token, user: newUser };
    },
    // update an existing user
    updateUser: async (_, { username, email, password }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { email, password },
        { new: true }
      );
      return updatedUser;
    },
     // add a new message
    addMessage: async (_, { sender, content, thread, location }, context) => {
      const newMessage = new Message({ sender, content, thread, location });
      await newMessage.save();
      return newMessage;
    },
    // update an existing message
    updateMessage: async (_, { messageId, content }, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }
      const message = await Message.findById(messageId);
      if (!message) {
        throw new Error('Message not found');
      }
      if (message.sender.toString() !== context.user._id.toString()) {
        throw new Error('Not authorized to update this message');
      }
      message.content = content;
      await message.save();
      return message;
    },
    // add a new chatroom
    addChatroom: async (_, { title, tagIds, icon }, context) => {
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
