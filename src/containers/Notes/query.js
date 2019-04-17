import gql from 'graphql-tag'

export const ALL_USER_CHAPTER_SUMMARIES = gql`
	query($userId: Int) {
		allChapterSummaries(condition: { userId: $userId }) {
			nodes {
				nodeId
				summary
				bookId
				chapter
			}
		}
	}
`
