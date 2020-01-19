import ApolloClient from 'apollo-boost'

export default function(logoutFunction = () => {}, jwt) {
	return new ApolloClient({
		uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
		fetchOptions: {
			credentials: 'include',
		},
		request: async operation => {
			if (jwt) {
				operation.setContext({
					headers: {
						authorization: `Bearer ${jwt}`,
					},
				})
			}
		},
		onError: ({ networkError }) => {
			if (networkError && networkError.statusCode === 401) {
				logoutFunction()
			}
		},
	})
}
