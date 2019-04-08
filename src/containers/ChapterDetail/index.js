import React from 'react'

import { getChapter, bookIdFromName, unformatBook } from 'helper'

import styles from './index.module.css'

export default props => {
	const bookId = bookIdFromName(props.match.params.bookName)
	const chapter = parseInt(props.match.params.chapter, 10)

	const bookName = unformatBook(props.match.params.bookName)

	const allChapter = getChapter(bookId, chapter)

	return (
		<div className="bodyContainer">
			<div className="cardContainer">
				<h3 className={styles.chapterTitle}>
					{bookName} {chapter} (ESV)
				</h3>
				<p className={styles.verses}>
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
				</p>
				<hr/>
				<p className={styles.copyRight}>
					Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright
					© 2001 by Crossway, a publishing ministry of Good News Publishers.
				</p>
			</div>
		</div>
	)
}
