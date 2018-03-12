import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import SummaryContainer from './SummaryContainer'

import { getChapterCount, getVerseCount } from 'helper'

class SummaryManager extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.selectedFilter = this.selectedFilter.bind(this)
		this.notSelectedFilter = this.notSelectedFilter.bind(this)
		this.map = this.map.bind(this)
		this.calculateSelectedPosition = this.calculateSelectedPosition.bind(this)
		this.calculateNotSelectedPosition = this.calculateNotSelectedPosition.bind(this)
	}
	selectedFilter(selectedBookId) {
		return ({ startBookId, endBookId }) => selectedBookId === startBookId && startBookId === endBookId
	}
	notSelectedFilter() {
		return ({ startBookId, endBookId }) => startBookId !== endBookId
	}

	map(calculatePosition) {
		return verseSummary => {
			const { title, startBookId, startChapter, startVerse, endBookId, endChapter, endVerse } = verseSummary

			const startPos = calculatePosition(startBookId, startChapter, startVerse)
			const endPos = calculatePosition(endBookId, endChapter, endVerse)

			const offset = startPos
			const width = endPos - startPos

			return { title, offset, width }
		}
	}

	calculateSelectedPosition(bookId, chapter, verse) {
		const chapterSize = this.props.getSelectedBookSize(bookId) / getChapterCount(bookId)
		return (
			this.props.calculateStartOfBook(bookId) +
			chapterSize * (chapter - 1) +
			chapterSize / getVerseCount(bookId, chapter) * (verse - 1)
		)
	}
	calculateNotSelectedPosition(bookId, chapter, verse) {
		const chapterSize = this.props.getBookSize(bookId) / getChapterCount(bookId)
		return this.props.calculateStartOfBook(bookId) + chapterSize * (chapter - 1)
	}

	formatSummaries(data, filter, map) {
		return data.filter(filter).map(map)
	}

	render() {
		const { loading, error } = this.props.data
		const { selecting, selectedBookId } = this.props

		if (loading || error) {
			return <SummaryContainer summaries={[]} />
		}

		const summaries = this.formatSummaries(
			this.props.data.versesSummaries.nodes,
			selecting ? this.selectedFilter(selectedBookId) : this.notSelectedFilter(),
			selecting ? this.map(this.calculateSelectedPosition) : this.map(this.calculateNotSelectedPosition),
		)

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
