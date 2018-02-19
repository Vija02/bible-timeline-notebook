import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import linkState from 'linkstate'

import BibleVerseSelector from 'components/BibleVerseSelector'

class AddSummaryIndex extends Component {
	constructor(props) {
		super(props)
		this.initState = {
			verse1: null,
			verse2: null,
			title: '',
			summary: '',
		}
		this.state = { ...this.initState }
	}

	addSummary() {
		const { verse1, verse2, title, summary } = this.state

		this.props
			.createVersesSummary({
				startBookId: verse1.book,
				startChapter: verse1.chapter,
				startVerse: verse1.verse,
				endBookId: verse2.book,
				endChapter: verse2.chapter,
				endVerse: verse2.verse,
				title,
				summary,
			})
			.then(() => {
				alert('Successfully created summary!')
				this.setState({ ...this.initState })
			})
			.catch(err => {
				console.log(err)
				alert('Error when updating summary. Please try again later.')
			})
	}

	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', marginBottom: 30 }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<a>From</a>
					<BibleVerseSelector onChange={linkState(this, 'verse1')} />
					<a>To</a>
					<BibleVerseSelector onChange={linkState(this, 'verse2')} />
				</div>
				<p>Title</p>
				<input type="text" value={this.state.title} onChange={linkState(this, 'title')} />
				<p>Summary</p>
				<textarea
					style={{ height: '100px' }}
					value={this.state.summary}
					onChange={linkState(this, 'summary')}
				/>
				<button
					style={{ width: '50px' }}
					disabled={!this.state.verse1 || !this.state.verse2}
					onClick={() => {
						this.addSummary()
					}}
				>
					Add
				</button>
			</div>
		)
	}
}

export default graphql(
	gql`
		mutation(
			$startBookId: Int!
			$startChapter: Int!
			$startVerse: Int!
			$endBookId: Int!
			$endChapter: Int!
			$endVerse: Int!
			$title: String!
			$summary: String!
		) {
			createVersesSummary(
				input: {
					versesSummary: {
						userId: 1
						startBookId: $startBookId
						startChapter: $startChapter
						startVerse: $startVerse
						endBookId: $endBookId
						endChapter: $endChapter
						endVerse: $endVerse
						title: $title
						summary: $summary
					}
				}
			) {
				versesSummary {
					nodeId
					id
					startBookId
					startChapter
					startVerse
					endBookId
					endChapter
					endVerse
					title
					summary
				}
			}
		}
	`,
	{
		props: ({ mutate }) => ({
			createVersesSummary: ({
				startBookId,
				startChapter,
				startVerse,
				endBookId,
				endChapter,
				endVerse,
				title,
				summary,
			}) =>
				mutate({
					variables: {
						startBookId,
						startChapter,
						startVerse,
						endBookId,
						endChapter,
						endVerse,
						title,
						summary,
					},
				}),
		}),
	},
)(AddSummaryIndex)
