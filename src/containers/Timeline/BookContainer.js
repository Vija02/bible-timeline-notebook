import React, { Component } from 'react'
import sizeMe from 'react-sizeme'
import { Motion, spring } from 'react-motion'

import { formatBook, bookIdFromName } from 'helper'
import bookData from 'assets/book_metadata.json'

import styles from './BookContainer.module.css'

class BookContainer extends Component {
	constructor(props) {
		super(props)
		this.state = { width: 0 }
	}
	componentWillUpdate(nextProps, nextState) {
		const selected = nextProps.match && nextProps.match.params.bookName === formatBook(nextProps.book.bookName)
		if (this.state.width === 0) {
			// If selected, the padding will be 0. Because of that, the width will be different from others.
			// So if selected, we add the padding here to offset that
			const padding = parseInt(styles.padding, 10) * 2
			const width = selected ? nextProps.size.width + padding : nextProps.size.width
			this.props.onWidth(width)
			this.setState({ width })
		}
	}

	// Create the array of chapters
	getBookArray() {
		const chaptersCount = bookData[bookIdFromName(this.props.book.bookName) - 1].chaptersCount
		let arr = []
		for (let i = 0; i < chaptersCount; i++) {
			arr.push(i + 1)
		}
		return (
			<div className={styles.bookArrayContainer}>
				{arr.map((val, i) => (
					<div key={`book_container_${i}`} className={styles.bookSection}>
						<div className={styles.bookNumber}>{val}</div>
					</div>
				))}
			</div>
		)
	}

	render() {
		const selected = this.props.match && this.props.match.params.bookName === formatBook(this.props.book.bookName)

		const motionStyle = selected
			? {
					width: spring(
						this.props.extendedWidthPercentage /
							100 *
							this.props.viewportWidth /
							document.documentElement.clientWidth *
							100,
					), // vw
				}
			: {
					width: spring(this.state.width / document.documentElement.clientWidth * 100),
				}

		return (
			<div
				className={selected ? styles.selectedBookContainer : styles.bookContainer}
				onClick={() => {
					this.props.history.push(`/book/${formatBook(this.props.book.bookName)}`)
				}}
				onMouseDown={e => {
					e.stopPropagation()
				}}
			>
				<Motion style={motionStyle}>
					{({ width }) => {
						// If it's something and it isn't 0
						const bookStyle = width !== 0 && this.props.size.width ? { width: `${width}vw` } : {}
						return (
							<div
								className={styles.bookSelector}
								style={
									selected
										? { ...bookStyle, margin: 0 }
										: { width: `calc(${bookStyle.width} - ${parseInt(styles.padding, 10) * 2}px)` }
								}
							>
								{selected && this.props.size.width ? this.getBookArray() : this.props.book.bookName}
							</div>
						)
					}}
				</Motion>
			</div>
		)
	}
}

export default sizeMe()(BookContainer)
