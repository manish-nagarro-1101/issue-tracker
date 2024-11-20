import { gql } from '@apollo/client';

export const ADD_ISSUE = gql`
  mutation AddIssue($title: String!, $description: String!, $status: String!) {
    addIssue(title: $title, description: $description, status: $status) {
      _id
      title
      description
      status
    }
  }
`;

export const UPDATE_ISSUE = gql`
  mutation UPDATE_ISSUE($id: ID!, $title: String, $description: String, $status: String) {
    updateIssue(id: $id, title: $title, description: $description, status: $status) {
      _id
      title
      description
      status
    }
  }
`;

export const DELETE_ISSUE = gql`
  mutation DELETE_ISSUE($id: ID!) {
    deleteIssue(id: $id) {
      _id
      message
    }
  }
`;