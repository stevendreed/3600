// schema.js
const { gql } = require("apollo-server-express");
const { User, Message, Chatroom } = require("../models");
const { signToken } = require('../utils/auth');
// moving to utils function
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const typeDefs = gql`
  type Query {
    user: User
    messages(chatroomId: ID!): [Message]
    chatrooms: [Chatroom]
  }

  type Mutation {
    LOGIN_USER(email: String!, password: String!): Auth
    ADD_USER(username: String!, email: String!, password: String!): Auth
    CHANGE_PASSWORD(userId: ID!, oldPassword: String!, newPassword: String!): Boolean
    DELETE_USER(username: String!): Auth
    ADD_MESSAGE(sender: ID!, content: String!, thread: ID, location: ID!): Message
    UPDATE_MESSAGE(messageId: ID!, content: String!): Message
    DELETE_MESSAGE(username: String!): Auth
    ADD_CHATROOM(title: String!, tagIds: [ID!], icon: String): Chatroom
    DELETE_CHAT(title: String!): Auth
  }

  type User {
    _id: ID
    username: String
    email: String @adminOnly
    password: String
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
    LOGIN_USER: async (_, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user || !await user.isCorrectPassword(password)) {
        throw new Error('Invalid credentials');
      }
      // token is signed with email information & the time stamp
      const token = signToken(user);
      // const token = jwt.sign({ 
      //   requester: email, 
      //   iat: Math.floor(Date.now() / 1000)
      // });// jwt token here
      return { token, user };
    },
    // add a new user
    ADD_USER: async (_, { username, email, password }, context) => {
      // variable for hashing password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // new user saved to database & hashes password
      const newUser = new User({
        username,
        email,
        password: hashedPassword
      });
      await newUser.save();
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    CHANGE_PASSWORD: async (_, { userId, oldPassword, newPassword }, context) => {
      // authenticate the user 
      if (!context.user || context.user._id !== userId) {
        throw new Error('Unauthorized');
      }
      // find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      // check if the old password is correct
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        throw new Error('Old password is incorrect');
      }
      // hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      // update the user's password
      user.password = hashedPassword;
      await user.save();
      return true; 
    },
    DELETE_USER: async (_, context) => {
      if (context.user)
      {
        return User.fineOneAndDelete({_id: context.user._id})
      }
      throw new Error('Could not find a user to delete');
    },
     // add a new message
    ADD_MESSAGE: async (_, { sender, content, thread, location }, context) => {
      const newMessage = new Message({ sender, content, thread, location });
      await newMessage.save();
      return newMessage;
    },

    // update an existing message
    UPDATE_MESSAGE: async (_, { messageId, content }, context) => {
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
    DELETE_MESSAGE: async (_, context) => {
      if (context.sender)
      {
        return Message.fineOneAndDelete({_id: context.message._id});
      }
      throw new Error('Could not find a user to delete');
    },
    // add a new chatroom
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
    DELETE_CHATROOM: async(_, context) => {
      // verify the id for our discovered chatroom is not null
      if (context._id)
      {
        return Chatroom.findOneAndDelete({_id: context._id});
      }
      throw new Error('No chatroom found');
    } // end deleteChatroom
  },
};

module.exports = { typeDefs, resolvers };
