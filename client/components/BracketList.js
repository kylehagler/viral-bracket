import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class BracketList extends Component {
	renderBrackets() {
		return this.props.data.brackets.map(bracket => {
			return (
				<li className="collection-item" key={bracket.id}>
					{bracket.title}
				</li>
			);
		});
	}

	render() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		}

		return <ul className="collection">{this.renderBrackets()}</ul>;
	}
}

const query = gql`
	{
		brackets {
			id
			title
		}
	}
`;

export default graphql(query)(BracketList);
