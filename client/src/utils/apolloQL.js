import { gql } from '@apollo/client';

// export const LOGIN_USER = gql`
//   mutation {
//     loginUser(email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//         email
//       }
//     }
//   }
// `;

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  LOGIN_USER(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      image
      recentChatrooms {
        _id
      }
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

// export const GET_CHATROOMS = gql`
//   query {
//     getChatrooms(options: { sortBy: $sortBy, filterActive: $filterActive }) {
//       _id
//       title
//       createdAt
//       activeUsers {
//         _id
//         username
//       }
//     }
//   }
// `;

export const GET_CHATROOMS = gql`
query Query($options: ChatroomQueryOptions) {
  getChatrooms(options: $options) {
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
  query Query {
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

// export const chatrooms = gql`
// query {
//   chatrooms {
//     _id
//     title
//     tags {
//       _id
//       name
//     }
//     icon
//     createdAt
//   }
// }
// `;

export const getMessages = gql`
  query Query($chatroomId: ID!) {
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
// export const getMessages = gql`
// query {
//     getMessages(chatroomId: $chatroomId) {
//       _id
//       sender {
//         _id
//         username
//         image
//       }
//       content
//       location {
//         _id
//       }
//       createdAt
//     }
//   }
// `;

export const ADD_MESSAGE = gql`
  mutation Mutation($sender: ID!, $content: String!, $location: ID!) {
    ADD_MESSAGE(sender: $sender, content: $content, location: $location) {
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

// export const ADD_MESSAGE = gql`
//   mutation {
//     ADD_MESSAGE(sender: $sender, content: $content, thread: $thread, location: $location) {
//       _id
//       sender {
//         _id
//         username
//         image
//       }
//       content
//       location {
//         _id
//       }
//       createdAt
//     }
//   }
// `;

// export const ADD_CHATROOM = gql`
//   mutation {
//     ADD_CHATROOM(title: $title, tagNames: $tagNames, icon: $icon) {
//       title
//       tags {
//         _id
//         name
//       }
//       icon
//       createdAt
//     }
//   }
// `;

export const ADD_CHATROOM = gql`
  mutation Mutation($title: String!, $tagNames: [String!], $icon: String) {
    ADD_CHATROOM(title: $title, tagNames: $tagNames, icon: $icon) {
      createdAt
      icon
    }
  }
`;

// export const ENTER_CHATROOM = gql`
//   mutation {
//     ENTER_CHATROOM(chatroomId: $chatroomId, userId: $userId) {
//       _id
//       icon
//       activeUsers {
//         _id
//       }
//     }
//   }
// `;

export const ENTER_CHATROOM = gql`
  mutation Mutation($chatroomId: ID!, $userId: ID!) {
    ENTER_CHATROOM(chatroomId: $chatroomId, userId: $userId) {
      _id
      createdAt
      activeUsers {
        _id
      }
      icon
    }
  }
`

// export const LEAVE_CHATROOM = gql`
//   mutation {
//     LEAVE_CHATROOM(chatroomId: $chatroomId, userId: $userId) {
//       _id
//       icon
//       activeUsers {
//         _id
//       }
//     }
//   }
// `;

export const LEAVE_CHATROOM = gql`
mutation Mutation($chatroomId: ID!, $userId: ID!) {
  LEAVE_CHATROOM(chatroomId: $chatroomId, userId: $userId) {
    _id
    icon
    activeUsers {
      _id
    }
  }
}
`