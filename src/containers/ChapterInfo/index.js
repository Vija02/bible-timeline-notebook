import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import Youtube from 'components/Youtube'

import book_overview from 'assets/book_overview.json'

import { bookNameFromId, bookIdFromName, formatBook, unformatBook, formatStringLineBreak } from 'helper'
import styles from './index.module.css'

export default props => {
	const bookId = bookIdFromName(props.match.params.bookName)
	const bookName = unformatBook(props.match.params.bookName)

	const bookOverviewData = useMemo(() => book_overview.find(book => book.bookId === bookId).data)

	return (
		<div className="bodyContainer">
			<div className="padContainer">
				<a href="https://thebibleproject.com/explore/" className={styles.bibleProjectBanner}>
					The Bible Project
				</a>
				<h1 className={styles.bookTitle}>{bookName}</h1>
				<div>
					{bookOverviewData.map(overviewMapper)}
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						{bookId > 1 ? (
							<Link to={`/${formatBook(bookNameFromId(bookId - 1))}`} className="link">
								Previous Book
							</Link>
						) : (
							<div />
						)}
						{bookId < 66 ? (
							<Link to={`/${formatBook(bookNameFromId(bookId + 1))}`} className="link">
								Next Book
							</Link>
						) : (
							<div />
						)}
					</div>
					<span className={styles.credits}>
						All Videos and content originated from{' '}
						<a href="https://thebibleproject.com/explore/" className="link">
							The Bible Project
						</a>
					</span>
				</div>
			</div>
		</div>
	)
}

const typeMap = {
	title: (child, i) => (
		<h3 key={i} className={styles.title}>
			{child}
		</h3>
	),
	subtitle: (child, i) => <p key={i}>{child}</p>,
	video: (child, i) => <Youtube key={i} youtubeId={child} className={styles.video} />,
	info: (child, i) => <p key={i}>{formatStringLineBreak(child)}</p>,
}

const overviewMapper = (val, i) => {
	return typeMap[val.type](val.data, i)
}
