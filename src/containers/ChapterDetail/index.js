import React from 'react'
import { Redirect } from 'react-router-dom'

import { getChapter, bookIdFromName, unformatBook, getChapterCount } from 'helper'

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
				<hr />
				<p className={styles.copyRight}>
					Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright
					© 2001 by Crossway, a publishing ministry of Good News Publishers.
				</p>
			</div>
		</div>
	)
}
