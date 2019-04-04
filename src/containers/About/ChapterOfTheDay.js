import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Code } from 'react-content-loader'
import { Route } from 'react-router-dom'

import Query from 'components/Query'
import AbsoluteAnimatedSwitch from 'components/AbsoluteAnimatedSwitch'

import { randomChapter, bookNameFromId, getSlicedChapter } from 'helper'

import { GET_CHAPTER_OF_THE_DAY } from './queries'
import styles from './index.module.css'

export default class ChapterOfTheDay extends Component {
	render() {
		return (
			<div className={styles.cardContainer}>
				<div className={styles.chapterOfTheDayTitle}>Chapter of the day</div>
				<Query query={GET_CHAPTER_OF_THE_DAY} throwError={false}>
					{({ loading, data, error }) => {
						return (
							<AbsoluteAnimatedSwitch location={{ pathname: loading ? '/loading' : '/' }}>
								<Route
									path="/loading"
									exact
									render={() => <Code height={80} width={700} style={{ marginTop: 40 }} />}
								/>
								<Route
									path="/"
									render={() => {
										const theChapter = error ? randomChapter() : data.getChapterOfTheDay

										return (
											<ChapterContent bookId={theChapter.bookId} chapter={theChapter.chapter} />
										)
									}}
								/>
							</AbsoluteAnimatedSwitch>
						)
					}}
				</Query>
			</div>
		)
	}
}

const ChapterContent = ({ bookId, chapter }) => {
	const slicedChapter = getSlicedChapter(bookId, chapter)

	return (
		<>
			<h3 className={styles.chapterTitle}>
				{bookNameFromId(bookId)} {chapter} (ESV)
			</h3>
			<p className={styles.verses}>
				{slicedChapter.map(([verseNum, content]) => {
					return (
						<React.Fragment key={verseNum}>
							<sup className={styles.verseNumber}>{verseNum}</sup>
							<span>{content}</span>
						</React.Fragment>
					)
				})}
				...
			</p>
			<Link to="/about" className={styles.readMore}>
				Read more...
			</Link>
		</>
	)
}
