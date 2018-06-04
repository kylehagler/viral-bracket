import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchBrackets';

class BracketList extends Component {
	onBracketDelete(id) {
		this.props.mutate({ variables: { id } }).then(() => this.props.data.refetch());
	}

	renderBrackets() {
		return this.props.data.brackets.map(({ id, title }) => {
			return (
				<li className="collection-item" key={id}>
					<Link to={`/brackets/${id}`}>{title}</Link>
					<i className="material-icons" onClick={() => this.onBracketDelete(id)}>
						delete
					</i>
				</li>
			);
		});
	}

	render() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<ul className="collection">{this.renderBrackets()}</ul>
				<Link to="/brackets/new" className="btn-floating btn-large red right">
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	}
}

const mutation = gql`
	mutation DeleteBracket($id: ID!) {
		deleteBracket(id: $id) {
			id
		}
	}
`;

export default graphql(mutation)(graphql(query)(BracketList));
