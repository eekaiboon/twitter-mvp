import { gql } from '@apollo/client';

/**
 * Basic User fragment to ensure consistent user data across queries
 */
export const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    username
    email
    createdAt
    updatedAt
  }
`;

/**
 * Node interface fragment for Relay compatibility
 */
export const NODE_FRAGMENT = gql`
  fragment NodeFields on Node {
    id
    ... on User {
      ...UserFields
    }
    # Add Tweet fragments when implemented
  }
  ${USER_FRAGMENT}
`;