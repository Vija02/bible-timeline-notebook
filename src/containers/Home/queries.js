import gql from 'graphql-tag'

import { VERSE_SUMMARY_FRAGMENT } from 'sharedQueries/fragments'

export const ALL_VERSES_SUMMARIES = gql`
	{
		viewer {
			versesSummaries: versesSummariesByUserId {
				nodes {
					...verseSummaryFragment
				}
			}
		}
	}
	${VERSE_SUMMARY_FRAGMENT}
`
