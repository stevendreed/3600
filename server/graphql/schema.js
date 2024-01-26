// schema.js
const { gql } = require('apollo-server-express');
const { User, Message, Chatroom } = require('../models');
const chatroom = require('../models/chatroom');

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
    DELETE_USER(username: String!): Auth
    addMessage(sender: ID!, content: String!, thread: ID, location: ID!): Message
    DELETE_MESSAGE(username: String!): Auth
    addChatroom(title: String!, tagIds: [ID!], icon: String): Chatroom
    DELETE_CHAT(title: String!): Auth
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
    login: async (_, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user || !await user.isCorrectPassword(password)) {
        throw new Error('Invalid credentials');
      }
      const token = // jwt token here
      return { token, user };
    },
    addUser: async (_, { username, email, password }, context) => {
      const newUser = new User({ username, email, password });
      await newUser.save();
      const token = // jwt token here
      return { token, user: newUser };
    },
    updateUser: async (_, { username, email, password }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { email, password },
        { new: true }
      );
      return updatedUser;
    },
    DELETE_USER: async (_, context) => {
      if (context.user)
      {
        return User.fineOneAndDelete({_id: context.user._id})
      }
      throw new Error('Could not find a user to delete');
    },
    addMessage: async (_, { sender, content, thread, location }, context) => {
      const newMessage = new Message({ sender, content, thread, location });
      await newMessage.save();
      return newMessage;
    },
    DELETE_MESSAGE: async (_, context) => {
      if (context.sender)
      {
        return Message.fineOneAndDelete({_id: context.message._id});
      }
      throw new Error('Could not find a user to delete');
    },
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
