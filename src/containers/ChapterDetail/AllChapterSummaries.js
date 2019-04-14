import React from 'react'
import Query from 'components/Query'

import { ALL_CHAPTER_SUMMARIES } from './queries'
import styles from './index.module.css'

export default ({ bookId, chapter }) => {
	// TODO: Limit loading and do endless scrolling
	// Need to figure out which comments to show as well.

	// TODO: Maybe make your own summary appear on top
	// TODO: Edit/Delete/Make private the summary
	return (
		<Query query={ALL_CHAPTER_SUMMARIES} variables={{ bookId, chapter }}>
			{({ loading, error, data }) => {
				if (loading) {
					return 'Loading...'
				} else if (error) {
					return 'An error occured'
				}

				// TODO: Limit the vertical length of post and add read more button

				return data.allChapterSummaries.nodes.map((summary, i) => (
					<div key={i} className={styles.container}>
						<p className={styles.summaryTitle}>{summary.user.emailAddress}</p>
						<p className={styles.summaryContent}>
							{summary.summary
								.replace(/\n/g, '<br />')
								.split(/(<br \/>)/g)
								.map(text => (text === '<br />' ? <br /> : text))}
						</p>
					</div>
				))
			}}
		</Query>
	)
}
