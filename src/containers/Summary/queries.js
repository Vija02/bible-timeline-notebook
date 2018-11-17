import gql from 'graphql-tag'

import { VERSE_SUMMARY_FRAGMENT } from 'sharedQueries/fragments'

export const GET_VERSES_SUMMARY = gql`
	query($id: Int!) {
		verseSummary: versesSummaryById(id: $id) {
			...verseSummaryFragment
		}
	}
	${VERSE_SUMMARY_FRAGMENT}
`

export const UPDATE_VERSE_SUMMARY = gql`
	mutation(
		$id: Int!
		$startBookId: Int!
		$startChapter: Int!
		$startVerse: Int!
		$endBookId: Int!
		$endChapter: Int!
		$endVerse: Int!
		$title: String!
		$summary: String!
	) {
		updateVersesSummaryById(
			input: {
				id: $id
				versesSummaryPatch: {
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

export const DELETE_VERSE_SUMMARY = gql`
	mutation($id: Int!) {
		deleteVersesSummaryById(input: { id: $id }) {
			deletedVersesSummaryId
		}
	}
	${VERSE_SUMMARY_FRAGMENT}
`
