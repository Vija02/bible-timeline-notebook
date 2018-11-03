import gql from 'graphql-tag'

export const VERSE_SUMMARY_FRAGMENT = gql`
	fragment verseSummaryFragment on VersesSummary {
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
`
