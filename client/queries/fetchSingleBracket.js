import gql from 'graphql-tag';

export default gql`
	query FetchBracket($id: ID!) {
		bracket(id: $id) {
			id
			title
			description
			size
		}
	}
`;
