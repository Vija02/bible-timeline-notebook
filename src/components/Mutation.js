import React, { Component } from 'react'
import { Mutation as GQLMutation } from 'react-apollo'

export default class Mutation extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}
	componentDidCatch(error, info) {
		// Display fallback UI
		console.log(error, info)
		this.setState({ hasError: true })
	}

	render() {
		if (this.state.hasError) {
			return <p>An error has occured. Please try again later.</p>
		}
		return (
			<GQLMutation {...this.props}>
				{(mutation, data) => {
					if (data.error) {
						throw new Error(data.error)
					}
					return this.props.children(mutation, data)
				}}
			</GQLMutation>
		)
	}
}
