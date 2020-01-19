import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Loading from 'components/Loading'
import Error from 'components/Error'

import { useAuth } from 'providers/Auth'

import bookData from 'assets/book_metadata.json'

import styles from './index.module.css'
import { ALL_USER_CHAPTER_SUMMARIES } from './query'

export default () => {
	const { userId } = useAuth()
	const bookDivisions = [...new Set(bookData.map(book => book.bookDivision))]

	const { loading, error, data } = useQuery(ALL_USER_CHAPTER_SUMMARIES, { variables: { userId } })

	if (loading) {
		return <Loading />
	}

	if (error) {
		return <Error />
	}

	return (
		<div className="bodyContainer">
			<div className="padContainer">
				<div>
					{/* Division */}
					{bookDivisions.map((division, i) => {
						const theBooks = bookData.filter(book => book.bookDivision === division)
						return (
							<div key={i}>
								<h3 className={styles.division}>{division}</h3>
								<div className={styles.divisionContainer}>
									{theBooks.map(book => {
										return (
											<div key={`book_${book.bookId}`}>
												<h4 className={styles.bookName}>
													{book.bookName}
													<span>({book.chaptersCount} chapters)</span>
												</h4>
												{data.allChapterSummaries.nodes
													.filter(node => node.bookId === book.bookId)
													.map((node, i) => (
														<div key={i} className={styles.summaryContainer}>
															<p
																style={{
																	fontSize: `${1.7 -
																		node.chapter.toString().length * 0.2}em`,
																}}
																className={styles.chapterNumber}
															>
																{node.chapter}
															</p>
															<p>{node.summary}</p>
														</div>
													))}
											</div>
										)
									})}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
