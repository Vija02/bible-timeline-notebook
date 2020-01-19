import React, { useEffect, useMemo } from 'react'
import { Link, Route } from 'react-router-dom'
import { Code } from 'react-content-loader'
import { useQuery } from '@apollo/react-hooks'

import AbsoluteAnimatedSwitch from 'components/AbsoluteAnimatedSwitch'
import Error from 'components/Error'

import useEsv, { useLazyEsv } from 'hooks/useEsv'

import { randomChapter, sliceChapter, bookNameFromId, formatBook } from 'helper'

import { GET_CHAPTER_OF_THE_DAY } from './queries'
import styles from './index.module.css'

export default () => {
	const { loading, error, data } = useQuery(GET_CHAPTER_OF_THE_DAY)
	const [preLoadChapter] = useLazyEsv(data?.getChapterOfTheDay?.bookId, data?.getChapterOfTheDay?.chapter)

	useEffect(() => {
		preLoadChapter()
	}, [data, preLoadChapter])

	return (
		<div className={styles.cotdInnerContainer}>
			<div className="cardContainer">
				<div className={styles.chapterOfTheDayTitle}>Chapter of the day</div>
				<AbsoluteAnimatedSwitch location={{ pathname: loading ? '/loading' : '/' }}>
					<Route path="/loading" exact render={() => <Loader />} />
					<Route
						path="/"
						render={() => {
							if (error) {
								return <RandomChapter />
							}
							return <ChapterContent chapterOfTheDayData={data.getChapterOfTheDay} />
						}}
					/>
				</AbsoluteAnimatedSwitch>
			</div>
		</div>
	)
}

const Loader = () => <Code height={80} width={700} style={{ marginTop: 40 }} />

const ChapterContent = ({ chapterOfTheDayData }) => {
	const slicedChapter = sliceChapter(chapterOfTheDayData.esv.nodes.map(node => [node.verse, node.content]))

	const bookName = bookNameFromId(chapterOfTheDayData.bookId)
	const chapter = chapterOfTheDayData.chapter

	return (
		<>
			<h3 className={styles.chapterTitle}>
				{bookName} {chapter} (ESV)
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
			<Link to={`/${formatBook(bookName)}/${chapter}`} className={styles.readMore}>
				Read more...
			</Link>
		</>
	)
}

// We can probably make this simpler. But at the time I didn't want to spend too much time on this
const RandomChapter = () => {
	const theChapter = useMemo(() => randomChapter(), [])
	const { error, loading, data } = useEsv(theChapter.bookId, theChapter.chapter)

	if (loading) {
		return <Loader />
	}

	if (error) {
		return <Error />
	}

	const chapterOfTheDayData = { bookId: theChapter.bookId, chapter: theChapter.chapter, esv: data.allEsvs }

	return <ChapterContent chapterOfTheDayData={chapterOfTheDayData} />
}
