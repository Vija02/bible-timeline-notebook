import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Query from 'components/Query'
import { composeReference } from 'helper'

import styles from './Summary.module.css'
import { GET_VERSES_SUMMARY } from './queries'

class SummaryIndex extends Component {
	render() {
		return (
			<Query query={GET_VERSES_SUMMARY} variables={{ id: parseInt(this.props.match.params.id, 10) }}>
				{({ loading, data }) => {
					if (loading) {
						return null
					}

					if (!data.verseSummary) {
						return <Redirect to={this.props.history.location.pathname.split('summary')[0]} />
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
					} = data.verseSummary
					return (
						<div className={styles.container}>
							<p>
								{title}{' '}
								<i>
									(
									{composeReference(
										startBookId,
										startChapter,
										startVerse,
										endBookId,
										endChapter,
										endVerse,
									)}
									)
								</i>
							</p>
							<p>{summary}</p>
						</div>
					)
				}}
			</Query>
		)
	}
}

export default SummaryIndex
