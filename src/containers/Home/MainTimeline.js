import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Scroller from './Scroller'
import BookContainer from './BookContainer'
import SummaryManager from './SummaryManager'

import GetSize from 'components/GetSize'

import { oldTestament, booksRegex, bookIdFromName, clampValue, unformatBook } from 'helper'
import styles from './MainTimeline.module.css'

// Width in % when the book selector is expanded
const extendedWidthPercentage = 90

class MainTimeline extends Component {
	constructor(props) {
		super(props)
		this.state = { sizes: [], width: 0, viewportWidth: null }

		this.calculateStartOfBook = this.calculateStartOfBook.bind(this)
		this.getBookSize = this.getBookSize.bind(this)
		this.getSelectedBookSize = this.getSelectedBookSize.bind(this)
	}

	getBookPositionOnGrid(bookName) {
		const startPos = 2 * (bookIdFromName(bookName) - 1) + 1
		return `${startPos}/${startPos + 1}`
	}

	calculateStartOfBook(bookId) {
		const dashTotalWidth = parseInt(styles.dashSideMargin, 10) * 2 + parseInt(styles.dashWidth, 10)
		let startOfBook = 0

		// Add all books width
		for (let j = 0; j < bookId - 1; j++) {
			startOfBook += this.state.sizes[j + 1]
		}
		// Add miscellaneous
		startOfBook += (bookId - 1) * dashTotalWidth + parseInt(styles.scrollerSidePadding, 10)

		return startOfBook
	}

	getBookSize(bookId) {
		return this.state.sizes[bookId]
	}

	getSelectedBookSize() {
		return extendedWidthPercentage / 100 * this.state.viewportWidth
	}

	render() {
		const xEnd = -this.state.width + document.documentElement.clientWidth

		return (
			<div className={styles.timelineContainer}>
				<Route
					path={`/book/:bookName(${booksRegex})`}
					children={props => {
						let centerBookPos
						if (props.match) {
							const bookId = bookIdFromName(props.match.params.bookName)
							const startOfBook = this.calculateStartOfBook(bookId)

							// Calculate center by subtracting the start val with (remaining space / 2)
							centerBookPos = clampValue(
								startOfBook -
									(this.state.viewportWidth -
										extendedWidthPercentage / 100 * this.state.viewportWidth) /
										2,
								0,
								-xEnd,
							)
						}

						return (
							<GetSize
								OnDimensionUpdate={({ width }) => {
									this.state.viewportWidth !== width && this.setState({ viewportWidth: width })
								}}
							>
								<Scroller
									className={styles.fullSize}
									target={centerBookPos || centerBookPos === 0 ? centerBookPos : undefined}
									viewportWidth={this.state.viewportWidth}
									onWidth={width => {
										this.state.width !== width && this.setState({ width })
									}}
									onScrollDown={() => {
										props.history.push('/')
									}}
								>
									<div className={styles.scrollerContainer}>
										<div className={styles.scrollerGridContainer}>
											<div className={styles.scrollerTitleContainer} />
											{oldTestament.map((book, i) => [
												<BookContainer
													{...props}
													key={`book_${i}`}
													book={book}
													extendedWidthPercentage={extendedWidthPercentage}
													onWidth={width => {
														this.state.sizes[bookIdFromName(book.bookName)] !== width &&
															this.setState(state => ({
																sizes: {
																	...state.sizes,
																	[bookIdFromName(book.bookName)]: width,
																},
															}))
													}}
													viewportWidth={this.state.viewportWidth}
												/>,
												<hr key={`hr_${i}`} className={styles.dashedLine} />,
											])}
											{props.match && props.match.params.bookName ? (
												<div
													style={{
														display: 'inline-flex',
														justifyContent: 'center',
														alignSelf: 'end',
														fontSize: '1.5em',
														gridRow: '1/2',
														gridColumn: this.getBookPositionOnGrid(
															props.match.params.bookName,
														),
													}}
												>
													{unformatBook(props.match.params.bookName)}
												</div>
											) : null}
										</div>
										<SummaryManager
											calculateStartOfBook={this.calculateStartOfBook}
											getBookSize={this.getBookSize}
											getSelectedBookSize={this.getSelectedBookSize}
											selecting={!!props.match}
											selectedBookId={
												props.match && props.match.params.bookName
													? bookIdFromName(props.match.params.bookName)
													: null
											}
										/>
									</div>
								</Scroller>
							</GetSize>
						)
					}}
				/>
			</div>
		)
	}
}

export default MainTimeline
