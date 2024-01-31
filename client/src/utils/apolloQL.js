import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const GET_CHATROOMS = gql`
  query {
    getChatrooms(options: { sortBy: $sortBy, filterActive: $filterActive }) {
      _id
      title
      createdAt
      activeUsers {
        _id
        username
      }
    }
  }
`;


export const chatrooms = gql`
query {
  chatrooms {
    _id
    title
    tags {
      _id
      name
    }
    icon
    createdAt
  }
}
`;

export const getMessages = gql`
query {
    getMessages(chatroomId: $chatroomId) {
      _id
      sender {
        _id
        username
        image
      }
      content
      location {
        _id
      }
      createdAt
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation {
    ADD_MESSAGE(sender: $sender, content: $content, thread: $thread, location: $location) {
      _id
      sender {
        _id
        username
        image
      }
      content
      location {
        _id
      }
      icon
      createdAt
    }
  }
`;

export const ADD_CHATROOM = gql`
  mutation {
    ADD_CHATROOM(title: $title, tagNames: $tagNames, icon: $icon) {
      _id
      title
      tags {
        _id
        name
      }
      icon
      createdAt
    }
  }
`;

export const ENTER_CHATROOM = gql`
  mutation {
    ENTER_CHATROOM(chatroomId: $chatroomId, userId: $userId) {
      _id
      icon
      activeUsers {
        _id
      }
    }
  }
`;

export const LEAVE_CHATROOM = gql`
  mutation {
    LEAVE_CHATROOM(chatroomId: $chatroomId, userId: $userId) {
      _id
      icon
      activeUsers {
        _id
      }
    }
  }
`;
