import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchBracket from '../queries/fetchSingleBracket';

class BracketDetail extends Component {
	render() {
		const { bracket } = this.props.data;

		if (!bracket) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<Link to="/">Back</Link>
				<h3>{bracket.title}</h3>
				<p>{bracket.description}</p>
			</div>
		);
	}
}

export default graphql(fetchBracket, {
	options: props => {
		return { variables: { id: props.params.id } };
	}
})(BracketDetail);
