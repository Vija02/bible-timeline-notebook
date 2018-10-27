import React, { Component } from 'react'
import { Query as GQLQuery } from 'react-apollo'

export default class Query extends Component {
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
			<GQLQuery {...this.props} fetchPolicy="network-only" notifyOnNetworkStatusChange>
				{result => {
					if (result.error) {
						throw new Error(result.error)
					}
					return this.props.children(result)
				}}
			</GQLQuery>
		)
	}
}
