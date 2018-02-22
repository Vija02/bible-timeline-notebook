import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Scroller from './Scroller'
import BookContainer from './BookContainer'

import GetSize from 'components/GetSize'

import { oldTestament, booksRegex, bookIdFromName, clampValue } from 'helper'
import styles from './MainTimeline.module.css'

// Width in % when the book selector is expanded
const extendedWidthPercentage = 90

class MainTimeline extends Component {
	constructor(props) {
		super(props)
		this.state = { sizes: [], width: 0, viewportWidth: null }
	}
	render() {
		const xEnd = -this.state.width + document.documentElement.clientWidth

		return (
			<div className={styles.timelineContainer}>
				<Route
					path={`/book/:bookName(${booksRegex})`}
					children={props => {
						const dashTotalWidth = parseInt(styles.dashSideMargin, 10) * 2 + parseInt(styles.dashWidth, 10)

						let startOfBook
						let centerBookPos
						if (props.match) {
							const bookId = bookIdFromName(props.match.params.bookName)

							startOfBook = 0
							// Add all books width
							for (let j = 0; j < bookId - 1; j++) {
								startOfBook += this.state.sizes[j + 1]
							}
							// Add miscellaneous
							startOfBook += (bookId - 1) * dashTotalWidth + parseInt(styles.scrollerSidePadding, 10)

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
											{/* <div className={styles.scrollerSummaryContainer}>
												<div
													style={{
														marginLeft: 100,
														width: 200,
														height: 20,
														border: '1px solid black',
														borderTop: 'none',
													}}
												/>
											</div> */}
										</div>
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
