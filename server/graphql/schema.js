const { gql } = require("apollo-server-express");
const { signToken } = require('../utils/auth');
// moving to utils function
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models'); // import all models

// define graphql type definitions
const typeDefs = gql`
  type Query {
    user: User
    messages(chatroomId: ID!): [Message]
    chatrooms: [Chatroom] 
    getChatrooms(options: ChatroomQueryOptions): [Chatroom]
  }

  type Mutation {
    LOGIN_USER(email: String!, password: String!): Auth
    ADD_USER(username: String!, email: String!, password: String!): Auth
    CHANGE_EMAIL(userId: ID!, newEmail: String!): ChangeEmailResponse
    CHANGE_USERNAME(userId: ID!, newUsername: String!): ChangeUsernameResponse
    CHANGE_PASSWORD(userId: ID!, oldPassword: String!, newPassword: String!): ChangePasswordResponse
    DELETE_USER(username: String!): Auth
    ADD_MESSAGE(sender: ID!, content: String!, thread: ID, location: ID!): Message
    UPDATE_MESSAGE(messageId: ID!, content: String!): Message
    DELETE_MESSAGE(username: String!): Auth
    ADD_CHATROOM(title: String!, tagNames: [String!], icon: String): Chatroom
    DELETE_CHATROOM(title: String!): Auth
    ENTER_CHATROOM(chatroomId: ID!, userId: ID!): Chatroom
    LEAVE_CHATROOM(chatroomId: ID!, userId: ID!): Chatroom
  }

  directive @adminOnly on FIELD_DEFINITION

  type User {
    _id: ID
    username: String
    email: String @adminOnly
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

  type Subscription {
    messageAdded(chatroomId: ID!): Message
  }

  input ChatroomQueryOptions {
    sortBy: String
    filterActive: Boolean
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

  type ChangeEmailResponse {
    success: Boolean!
    message: String
  }

  type ChangeUsernameResponse {
    success: Boolean!
    message: String
  }

  type ChangePasswordResponse {
    success: Boolean!
    message: String
  }
`;

const resolvers = {
  // query resolvers
  Query: {
    // fetch a user by ID
    user: async (_, args) => {
      return await db.User.findById(args.id);
    },
    // fetch messages for a specific chatroom
    messages: async (_, { chatroomId }) => {
      return await db.Message.find({ location: chatroomId });
    },
    // fetch all chatrooms
    chatrooms: async () => {
      return await db.Chatroom.find({}).populate('tags');
    },
    // sort chatrooms
    getChatrooms: async (_, { options }) => {
      let query = {};
      let sort = {};
      // destructure sortBy and filterActive from options
      const { sortBy, filterActive } = options;
      // filter active chatrooms
      // will always filter out chatrooms older than one hour
      if (filterActive) {
        const oneHourAgo = new Date().getTime() - (60 * 60 * 1000);
        query.createdAt = { $gte: oneHourAgo };
      }
      // sorting
      switch (sortBy) {
        case 'oldest':
          // this will grab the ascending data from oldest to newest
          sort = { createdAt: 1 };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        case 'userCount':
          // sort by the length of the activeUsers array
          sort = { 'activeUsers.length': -1 }; // -1 for descending order (more active users first)
        break;
        default:
          // default sorting or no sorting
      }
      const chatrooms = await db.Chatroom.find(query)
        .sort(sort)
        .populate('icon')
        .populate('title')
        .populate('tags')
        .populate('activeUsers');
      return chatrooms;
    },
    subscription: {
      messageAdded: {
        subscribe: (_, { chatroomId }, { pubsub }) => 
          pubsub.asyncIterator(`MESSAGE_ADDED_${chatroomId}`)
      },
    },
  },
  // mutation resolvers
  Mutation: {
    // user login
    LOGIN_USER: async (_, { email, password }, context) => {
      // const hashedPW = await bcrypt.hash(password, saltRounds);
      const user = await db.User.findOne({ email });
      const goodPW = bcrypt.compare(password, user.password);
    
      if (!user || !goodPW) {
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
      const newUser = new db.User({
        username,
        email,
        password: hashedPassword
      });
      await newUser.save();
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    // change email of authenticated user
    CHANGE_EMAIL: async (_, { userId, newEmail }, context) => {
      if (!context.user || context.user._id !== userId) {
        throw new Error('Unauthorized');
      }
      const emailExists = await db.User.findOne({ email: newEmail });
      if (emailExists) {
        return { success: false, message: 'Email already in use' };
      }
      const user = await db.User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.email = newEmail;
      await user.save();
      return { success: true, message: 'Email successfully changed' };
    },
    // change username of authenticated user
    CHANGE_USERNAME: async (_, { userId, newUsername }, context) => {
      if (!context.user || context.user._id !== userId) {
        throw new Error('Unauthorized');
      }
      const usernameExists = await db.User.findOne({ username: newUsername });
      if (usernameExists) {
        return { success: false, message: 'Username already in use' };
      }
      const user = await db.User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.username = newUsername;
      await user.save();
      return { success: true, message: 'Username successfully changed' };
    },
    // change password of authenticated user 
    CHANGE_PASSWORD: async (_, { userId, oldPassword, newPassword }, context) => {
      if (!context.user || context.user._id !== userId) {
        return { success: false, message: 'Unauthorized' };
      }
      const user = await db.User.findById(userId);
      if (!user) {
        return { success: false, message: 'User not found' };
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return { success: false, message: 'Old password is incorrect' };
      }
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = hashedPassword;
      await user.save();
      return { success: true, message: 'Password successfully changed' };
    },
    // delete user 
    DELETE_USER: async (_, context) => {
      if (!context.user || context.user._id !== userId) {
        await db.User.findOneAndDelete({ _id: context.user._id });
        return { success: true, message: 'User deleted' };
      }
      throw new Error('Could not find a user to delete');
    },
     // add a new message
    ADD_MESSAGE: async (_, { sender, content, thread, location }, { pubsub }) => {
      const newMessage = new db.Message({ sender, content, thread, location });
      await newMessage.save();
      pubsub.publish(`MESSAGE_ADDED_${location}`, { messageAdded: newMessage });
      return newMessage;
    },
    // checks if user owns message and updates it
    UPDATE_MESSAGE: async (_, { messageId, content }, context) => {
      if (!context.user || context.user._id !== userId) {
        throw new Error('Authentication required');
      }
      const message = await db.Message.findById(messageId);
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
    // checks if user owns message and deletes it
    DELETE_MESSAGE: async (_, { messageId }, context) => {
      if (!context.user || context.user._id !== userId) {
        await db.Message.findOneAndDelete({ _id: messageId });
        return { success: true, message: 'Message deleted' };
      }
      throw new Error('Could not find a message to delete');
    },
    // add a new chatroom
    ADD_CHATROOM: async (_, { title, tagNames, icon }, context) => {
      const tags = await Promise.all(tagNames.map(async (name) => {
        let tag = await db.Tags.findOne({ name });
        if (!tag) {
          tag = new db.Tags({ name });
          await tag.save();
        }
        return tag;
      }));
      const tagIds = tags.map(tag => tag._id);
      const newChatroom = new db.Chatroom({ title, tags: tagIds, icon });
      await newChatroom.save();
      return newChatroom;
    },
    // deletes chatroom
    DELETE_CHATROOM: async (_, { chatroomId }, context) => {
      if (context._id)
      {
        throw new Error('No chatroom found');
      }
      if (!context.user || context.user._id !== userId) {
        throw new Error('You do not have permission to delete the chatroom');
      }
      // verify the id for our discovered chatroom is not null
      await db.Chatroom.findOneAndDelete({ _id: chatroomId });
      return { success: true, message: 'Chatroom deleted' };
    }, // end deleteChatroom
    // action to register user as active user
    ENTER_CHATROOM: async (_, { chatroomId, userId }) => {
      // logic to add userId to the activeUsers array of the chatroom
      return await db.Chatroom.findByIdAndUpdate(
        chatroomId,
        { $addToSet: { activeUsers: userId } }, // Use $addToSet to avoid duplicates
        { new: true }
      ).populate('activeUsers');
    },
    // action to deregister user as active user
    LEAVE_CHATROOM: async (_, { chatroomId, userId }) => {
      // logic to remove userId from the activeUsers array of the chatroom
      return await db.Chatroom.findByIdAndUpdate(
        chatroomId,
        { $pull: { activeUsers: userId } }, // use $pull to remove the user
        { new: true }
      ).populate('activeUsers');
    },
  },
};

module.exports = { typeDefs, resolvers };
