import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import SummaryContainer from './SummaryContainer'

import { getChapterCountFromBookId } from 'helper'

class SummaryManager extends Component {
	calculatePosition(bookId, chapter, verse) {
		return (
			this.props.calculateStartOfBook(bookId) +
			this.props.getBookSize(bookId) / getChapterCountFromBookId(bookId) * (chapter - 1)
		)
	}
	render() {
		const { loading, error } = this.props.data

		if (loading || error) {
			return <SummaryContainer summaries={[]} />
		}

		const summaries = this.props.data.versesSummaries.nodes
			.filter(({ startBookId, endBookId }) => startBookId !== endBookId)
			.map(verseSummary => {
				const { title, startBookId, startChapter, startVerse, endBookId, endChapter, endVerse } = verseSummary

				const startPos = this.calculatePosition(startBookId, startChapter, startVerse)
				const endPos = this.calculatePosition(endBookId, endChapter, endVerse)

				const offset = startPos
				const width = endPos - startPos

				return { title, offset, width }
			})
		return <SummaryContainer summaries={summaries} />
	}
}

export default graphql(gql`
	{
		versesSummaries: allVersesSummaries(condition: { userId: 1 }) {
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
`)(SummaryManager)
