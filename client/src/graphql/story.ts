import { gql } from "solid-urql";

export const CREATE_STORY = gql`
  mutation ($input: InputStory!) {
    createStory(input: $input) {
      id
      title
    }
  }
`;
