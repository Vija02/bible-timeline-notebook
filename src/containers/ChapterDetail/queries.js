import gql from 'graphql-tag'

export const CREATE_CHAPTER_SUMMARY = gql`
	mutation($summary: String, $userId: Int!, $bookId: Int!, $chapter: Int!) {
		createChapterSummary(
			input: { chapterSummary: { summary: $summary, userId: $userId, bookId: $bookId, chapter: $chapter } }
		) {
			chapterSummary {
				nodeId
				summary
				user: userByUserId {
					nodeId
					emailAddress
				}
			}
		}
	}
`

export const ALL_CHAPTER_SUMMARIES = gql`
	query($chapter: Int, $bookId: Int) {
		allChapterSummaries(condition: { chapter: $chapter, bookId: $bookId }, orderBy: CREATED_AT_DESC) {
			nodes {
				nodeId
				summary
				user: userByUserId {
					nodeId
					emailAddress
				}
			}
		}
	}
`
