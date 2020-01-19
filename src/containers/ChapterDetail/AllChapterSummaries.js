import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Loading from 'components/Loading'
import Error from 'components/Error'

import { formatStringLineBreak } from 'helper'

import { ALL_CHAPTER_SUMMARIES } from './queries'
import styles from './index.module.css'

export default ({ bookId, chapter }) => {
	// TODO: Limit loading and do endless scrolling
	// Need to figure out which comments to show as well.

	// TODO: Maybe make your own summary appear on top
	// TODO: Edit/Delete/Make private the summary

	const { loading, error, data } = useQuery(ALL_CHAPTER_SUMMARIES, { variables: { bookId, chapter } })

	if (loading) {
		return <Loading />
	}

	if (error) {
		return <Error />
	}

	// TODO: Limit the vertical length of post and add read more button

	return data.allChapterSummaries.nodes.map((summary, i) => (
		<div key={i} className={styles.container}>
			<p className={styles.summaryTitle}>{summary.user.emailAddress}</p>
			<p className={styles.summaryContent}>{formatStringLineBreak(summary.summary)}</p>
		</div>
	))
}
