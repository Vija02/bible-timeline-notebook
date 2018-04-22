import React, { Component } from 'react'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home'

class Root extends Component {
	createClient() {
		const cache = new InMemoryCache({
			dataIdFromObject: o => o.nodeId,
		})
		const httpLink = createHttpLink({
			uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
		})
		return new ApolloClient({
			cache: cache,
			link: httpLink,
			defaultOptions: { query: { notifyOnNetworkStatusChange: true } },
		})
	}
	render() {
		return (
			<ApolloProvider client={this.createClient()}>
				<Router>
					<div>
						<Switch>
							<Route path="/" component={Home} />
						</Switch>
						<div id="modal-root" />
					</div>
				</Router>
			</ApolloProvider>
		)
	}
}

export default Root
