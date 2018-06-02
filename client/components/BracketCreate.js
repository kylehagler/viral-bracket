import React, { Component } from 'react';

class BracketCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: ''
		};
	}

	render() {
		return (
			<div>
				<h3>Create a new bracket</h3>
				<form>
					<label>Bracket Title:</label>
					<input onChange={event => this.setState({ title: event.target.value })} value={this.state.title} />
				</form>
			</div>
		);
	}
}

export default BracketCreate;
