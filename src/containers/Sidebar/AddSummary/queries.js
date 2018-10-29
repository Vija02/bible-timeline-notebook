import gql from 'graphql-tag'

export const CREATE_VERSES_SUMMARY = gql`
	mutation(
		$startBookId: Int!
		$startChapter: Int!
		$startVerse: Int!
		$endBookId: Int!
		$endChapter: Int!
		$endVerse: Int!
		$title: String!
		$summary: String!
	) {
		createVersesSummary(
			input: {
				versesSummary: {
					userId: 1
					startBookId: $startBookId
					startChapter: $startChapter
					startVerse: $startVerse
					endBookId: $endBookId
					endChapter: $endChapter
					endVerse: $endVerse
					title: $title
					summary: $summary
				}
			}
		) {
			versesSummary {
				nodeId
				id
				startBookId
				startChapter
				startVerse
				endBookId
				endChapter
				endVerse
				title
				summary
			}
		}
	}
`
