import { gql } from '@apollo/client';
import { USER_FRAGMENT, NODE_FRAGMENT } from './fragments';

// User queries - using node query instead of user query
export const GET_USER = gql`
  query GetUser($id: ID!) {
    node(id: $id) {
      ... on User {
        ...UserFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    userByUsername(username: $username) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_ME = gql`
  query GetMe {
    me {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

// Node interface query
export const GET_NODE = gql`
  query GetNode($id: ID!) {
    node(id: $id) {
      ...NodeFields
    }
  }
  ${NODE_FRAGMENT}
`;