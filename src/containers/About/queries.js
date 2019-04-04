import gql from 'graphql-tag'

export const GET_CHAPTER_OF_THE_DAY = gql`
	query {
		getChapterOfTheDay {
			bookId
			chapter
		}
	}
`
