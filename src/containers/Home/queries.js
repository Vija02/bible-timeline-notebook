import gql from 'graphql-tag'

export const ALL_VERSES_SUMMARIES = gql`
	query($userId: Int!) {
		versesSummaries: allVersesSummaries(condition: { userId: $userId }) {
			nodes {
				nodeId
				id
				startBookId
				startChapter
				startVerse
				endBookId
				endChapter
				endVerse
				summary
				title
			}
		}
	}
`
