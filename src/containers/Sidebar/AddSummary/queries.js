import gql from 'graphql-tag'

import { VERSE_SUMMARY_FRAGMENT } from 'sharedQueries/fragments'

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
				...verseSummaryFragment
			}
		}
	}
	${VERSE_SUMMARY_FRAGMENT}
`
