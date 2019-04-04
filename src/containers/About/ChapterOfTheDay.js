import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import esv from 'assets/esv.json'
import { randomChapter, bookNameFromId } from 'helper'

import styles from './index.module.css'

export default class ChapterOfTheDay extends Component {
	render() {
		const theChapter = randomChapter()

		const esvChaptersObject = esv[bookNameFromId(theChapter.bookId)][theChapter.chapter]

		const slicedChapter = Object.entries(esvChaptersObject)
			.sort(([aKey], [bKey]) => {
				if (parseInt(aKey, 10) < parseInt(bKey, 10)) {
					return -1
				} else if (parseInt(aKey, 10) > parseInt(bKey, 10)) {
					return 1
				} else {
					return 0
				}
			})
			.reduce((acc, val) => {
				// Get the current length in the acc
				const currentLength = acc.reduce((a, v) => {
					return a + v[1].length
				}, 0)

				if (currentLength < 300) {
					return [...acc, [val[0], val[1].slice(0, 300 - currentLength)]]
				} else {
					return acc
				}
			}, [])
		return (
			<div className={styles.cardContainer}>
				<div className={styles.chapterOfTheDayTitle}>Chapter of the day</div>
				<h3 className={styles.chapterTitle}>
					{bookNameFromId(theChapter.bookId)} {theChapter.chapter} (ESV)
				</h3>
				<p className={styles.verses}>
					{slicedChapter.map(([verseNum, content]) => {
						return (
							<>
								<sup className={styles.verseNumber}>{verseNum}</sup>
								<span>{content}</span>
							</>
						)
					})}
					...
				</p>
				<Link to="/about" className={styles.readMore}>
					Read more...
				</Link>
			</div>
		)
	}
}
