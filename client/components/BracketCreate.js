import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchBrackets';

class BracketCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: ''
		};
	}

	onSubmit(event) {
		event.preventDefault();

		this.props
			.mutate({
				variables: {
					title: this.state.title
				},
				refetchQueries: [{ query }]
			})
			.then(() => hashHistory.push('/'))
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				<Link to="/">Back</Link>
				<h3>Create a new bracket</h3>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>Bracket Title:</label>
					<input onChange={event => this.setState({ title: event.target.value })} value={this.state.title} />
				</form>
			</div>
		);
	}
}

const mutation = gql`
	mutation AddBracket($title: String!, $description: String, $size: Int) {
		addBracket(title: $title, description: $description, size: $size) {
			title
		}
	}
`;

export default graphql(mutation)(BracketCreate);
