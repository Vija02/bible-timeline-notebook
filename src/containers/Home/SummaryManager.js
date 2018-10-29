import React, { Component } from 'react'

import Query from 'components/Query'
import { AuthConsumer } from 'providers/Auth'

import SummaryContainer from './SummaryContainer'

import { getChapterCount, getVerseCount } from 'helper'

import { ALL_VERSES_SUMMARIES } from './queries'

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
			const { id, title, startBookId, startChapter, startVerse, endBookId, endChapter, endVerse } = verseSummary

			const startPos = calculatePosition(startBookId, startChapter, startVerse)
			const endPos = calculatePosition(endBookId, endChapter, endVerse)

			const offset = startPos
			const width = endPos - startPos

			return { id, title, offset, width }
		}
	}

	calculateSelectedPosition(bookId, chapter, verse) {
		const chapterSize = this.props.getSelectedBookSize(bookId) / getChapterCount(bookId)
		return (
			this.props.calculateStartOfBook(bookId) +
			chapterSize * (chapter - 1) +
			(chapterSize / getVerseCount(bookId, chapter)) * (verse - 1)
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
		return (
			<AuthConsumer>
				{({ userId }) => (
					<React.Fragment>
						{userId >= 0 ? (
							<Query query={ALL_VERSES_SUMMARIES} variables={{ userId }}>
								{({ loading, data }) => {
									const { selecting, selectedBookId } = this.props

									if (loading) {
										return <SummaryContainer summaries={[]} />
									}

									const summaries = this.formatSummaries(
										data.versesSummaries.nodes,
										selecting ? this.selectedFilter(selectedBookId) : this.notSelectedFilter(),
										selecting
											? this.map(this.calculateSelectedPosition)
											: this.map(this.calculateNotSelectedPosition),
									)

									return <SummaryContainer summaries={summaries} match={this.props.match} />
								}}
							</Query>
						) : (
							<SummaryContainer summaries={[]} />
						)}
					</React.Fragment>
				)}
			</AuthConsumer>
		)
	}
}

export default SummaryManager
