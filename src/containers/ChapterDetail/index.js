import React from 'react'
import { Redirect, Link } from 'react-router-dom'

import OwnSummary from './OwnSummary'
import AllChapterSummaries from './AllChapterSummaries'

import {
	getPreviousChapter,
	getNextChapter,
	getChapter,
	bookIdFromName,
	bookNameFromId,
	unformatBook,
	formatBook,
	getChapterCount,
} from 'helper'

import styles from './index.module.css'

export default props => {
	const bookId = bookIdFromName(props.match.params.bookName)
	const chapter = parseInt(props.match.params.chapter, 10)

	// Validate chapter
	if (chapter < 1 || chapter > getChapterCount(bookId)) {
		return <Redirect to="/" />
	}

	const bookName = unformatBook(props.match.params.bookName)

	const allChapter = getChapter(bookId, chapter)

	return (
		<div className="bodyContainer">
			<div className="padContainer">
				<h3 className={styles.chapterTitle}>
					{bookName} {chapter} (ESV)
				</h3>
				<span className={styles.verses}>
					{allChapter.map(([verseNum, content]) => {
						return (
							<React.Fragment key={verseNum}>
								<p>
									<sup className={styles.verseNumber}>{verseNum}</sup>
									<span>{content}</span>
								</p>
							</React.Fragment>
						)
					})}
				</span>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					{!!getPreviousChapter(bookId, chapter) ? (
						<Link
							to={`/${formatBook(bookNameFromId(getPreviousChapter(bookId, chapter).bookId))}/${
								getPreviousChapter(bookId, chapter).chapter
							}`}
							className="link"
						>
							Previous Chapter
						</Link>
					) : (
						<div />
					)}
					{!!getNextChapter(bookId, chapter) ? (
						<Link
							to={`/${formatBook(bookNameFromId(getNextChapter(bookId, chapter).bookId))}/${
								getNextChapter(bookId, chapter).chapter
							}`}
							className="link"
						>
							Next Chapter
						</Link>
					) : (
						<div />
					)}
				</div>
				<hr />
				<p className={styles.copyRight}>
					Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright
					© 2001 by Crossway, a publishing ministry of Good News Publishers.
				</p>
			</div>
			<div className="padContainer">
				<h4 className={styles.thoughtsTitle}>Thoughts</h4>

				<OwnSummary bookId={bookId} chapter={chapter} />

				<AllChapterSummaries bookId={bookId} chapter={chapter} />
			</div>
		</div>
	)
}
