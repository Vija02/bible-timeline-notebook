import React from 'react'

import Query from 'components/Query'
import { useAuth } from 'providers/Auth'

import bookData from 'assets/book_metadata.json'

import styles from './index.module.css'
import { ALL_USER_CHAPTER_SUMMARIES } from './query'

export default () => {
	const { userId } = useAuth()
	const bookDivisions = [...new Set(bookData.map(book => book.bookDivision))]

	return (
		<div className="bodyContainer">
			<div className="padContainer">
				<Query query={ALL_USER_CHAPTER_SUMMARIES} variables={{ userId }}>
					{({ loading, error, data }) => {
						// TODO: Handle this better
						if (loading) {
							return <p>Loading</p>
						} else if (error) {
							return <p>Error</p>
						}

						return (
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
																.map(node => (
																	<div className={styles.summaryContainer}>
																		<p className={styles.chapterNumber}>
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
						)
					}}
				</Query>
			</div>
		</div>
	)
}
