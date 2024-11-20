import { gql } from '@apollo/client';

export const GET_ISSUES = gql`
  query GetIssues {
    issues {
      _id
      title
      description
      status
    }
  }
`;
