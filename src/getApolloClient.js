import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'

export default function(logoutFunction = () => {}, jwt) {
	const cache = new InMemoryCache({
		dataIdFromObject: o => o.nodeId,
	})
	const middlewareLink = setContext(() => {
		if (jwt) {
			return {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		}
		return {}
	})
	const logoutLink = onError(({ networkError }) => {
		if (networkError && networkError.statusCode === 401) {
			logoutFunction()
		}
	})
	const httpLink = createHttpLink({
		uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
	})
	return new ApolloClient({
		cache: cache,
		link: logoutLink.concat(middlewareLink.concat(httpLink)),
		defaultOptions: { query: { notifyOnNetworkStatusChange: true } },
	})
}
