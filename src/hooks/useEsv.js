import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_GREETING = gql`
	query($bookId: Int!, $chapter: Int!) {
		allEsvs(condition: { bookId: $bookId, chapter: $chapter }) {
			nodes {
				bookId
				chapter
				content
				verse
			}
		}
	}
`

export const useLazyEsv = (bookId, chapter) => {
	const res = useLazyQuery(GET_GREETING, {
		variables: { bookId, chapter },
	})
	if (!!res.data?.allEsvs?.nodes) {
		res.data.allEsvs.nodes = res.data.allEsvs.nodes.sort((a, b) => a.verse - b.verse)
		return res
	}
	return res
}

export default (bookId, chapter) => {
	const res = useQuery(GET_GREETING, {
		variables: { bookId, chapter },
	})
	if (!!res.data?.allEsvs?.nodes) {
		res.data.allEsvs.nodes = res.data.allEsvs.nodes.sort((a, b) => a.verse - b.verse)
		return res
	}
	return res
}
