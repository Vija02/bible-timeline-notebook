import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Menu, MenuItem } from '@material-ui/core'

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
				<div className={styles.titleContainer}>
					<div>
						<h3 className={styles.chapterTitle}>
							{bookName} {chapter} (ESV)
						</h3>

						<Link to={`/${props.match.params.bookName}`} className="link" style={{ fontSize: '0.8em' }}>
							More about this book
						</Link>
					</div>
					<DropdownSelector bookName={bookName} chapter={chapter} />
				</div>

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

const DropdownSelector = ({ bookName, chapter }) => {
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClose = () => setAnchorEl(null)
	const handleClick = e => setAnchorEl(e.currentTarget)

	return (
		<div>
			<div onClick={handleClick} className={styles.hamburgerBar}>
				<i className="fas fa-ellipsis-v " />
			</div>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				<a
					href={`https://www.biblegateway.com/passage/?search=${bookName}+${chapter}&version=NIRV`}
					className="plainLink"
				>
					<MenuItem>Read elsewhere</MenuItem>
				</a>
			</Menu>
		</div>
	)
}
