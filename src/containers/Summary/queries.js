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
