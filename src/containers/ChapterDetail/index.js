import React from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

import LoginModalToggler from 'containers/Navbar/LoginModalToggler'
import ChapterSummaryFormIndex from 'containers/Forms/ChapterSummaryForm'

import AllChapterSummaries from './AllChapterSummaries'

import Mutation from 'components/Mutation'
import { useAuth } from 'providers/Auth'

import { getChapter, bookIdFromName, unformatBook, getChapterCount } from 'helper'

import { CREATE_CHAPTER_SUMMARY, ALL_CHAPTER_SUMMARIES } from './queries'
import styles from './index.module.css'

export default props => {
	const { userId, jwt } = useAuth()

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
			<div className="padContainer">
				<h4 className={styles.thoughtsTitle}>Thoughts</h4>

				{!!jwt ? (
					<Mutation mutation={CREATE_CHAPTER_SUMMARY}>
						{createChapterSummary => (
							<ChapterSummaryFormIndex
								onSubmit={data => {
									return addSummary(createChapterSummary, userId, bookId, chapter, data)
								}}
							/>
						)}
					</Mutation>
				) : (
					<NotLoggedIn />
				)}

				<AllChapterSummaries bookId={bookId} chapter={chapter} />
			</div>
		</div>
	)
}

const addSummary = (createChapterSummary, userId, bookId, chapter, data) => {
	const { summary } = data

	return createChapterSummary({
		variables: {
			userId,
			summary,
			bookId,
			chapter,
		},
		update: (proxy, res) => {
			const chapterSummary = res.data.createChapterSummary.chapterSummary

			let updatedData = proxy.readQuery({ query: ALL_CHAPTER_SUMMARIES, variables: { bookId, chapter } })

			updatedData = {
				...updatedData,
				allChapterSummaries: {
					...updatedData.allChapterSummaries,
					nodes: [
						// Avoid duplication
						chapterSummary,
						...updatedData.allChapterSummaries.nodes.filter(val => val.nodeId !== chapterSummary.nodeId),
					],
				},
			}

			proxy.writeQuery({
				query: ALL_CHAPTER_SUMMARIES,
				variables: { bookId, chapter },
				data: updatedData,
			})
		},
	})
		.then(() => {
			toast.success(
				<p>
					<i className="far fa-check-circle" /> Successfully posted!
				</p>,
			)
		})
		.catch(err => {
			console.error(err)
			toast.error('Error creating the post. Please try again later.')
			throw new Error()
		})
}

const NotLoggedIn = () => {
	return (
		<div>
			<LoginModalToggler>
				<span className="link">Register or Login now to post!</span>
			</LoginModalToggler>
		</div>
	)
}
