import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { composeReference } from 'helper'

import styles from './Summary.module.css'

class SummaryIndex extends Component {
	render() {
		const { loading, error } = this.props.data
		if (loading || error) {
			return null
		}
		const {
			startBookId,
			startChapter,
			startVerse,
			endBookId,
			endChapter,
			endVerse,
			summary,
			title,
		} = this.props.data.verseSummary
		return (
			<div className={styles.container}>
				<p>
					{title} <i>({composeReference(startBookId, startChapter, startVerse, endBookId, endChapter, endVerse)})</i>
				</p>
				<p>{summary}</p>
			</div>
		)
	}
}

export default graphql(
	gql`
		query($id: Int!) {
			verseSummary: versesSummaryById(id: $id) {
				nodeId
				id
				startBookId
				startChapter
				startVerse
				endBookId
				endChapter
				endVerse
				summary
				title
			}
		}
	`,
	{
		options: ({ match }) => ({
			variables: { id: parseInt(match.params.id, 10) },
		}),
	},
)(SummaryIndex)
