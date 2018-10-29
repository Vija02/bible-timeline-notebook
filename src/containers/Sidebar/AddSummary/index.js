import React, { Component } from 'react'
import linkState from 'linkstate'
import { toast } from 'react-toastify'

import Mutation from 'components/Mutation'
import BibleVerseSelector from 'components/BibleVerseSelector'

import { CREATE_VERSES_SUMMARY } from './queries'

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

	addSummary(createVersesSummary) {
		const { verse1, verse2, title, summary } = this.state

		createVersesSummary({
			variables: {
				startBookId: verse1.book,
				startChapter: verse1.chapter,
				startVerse: verse1.verse,
				endBookId: verse2.book,
				endChapter: verse2.chapter,
				endVerse: verse2.verse,
				title,
				summary,
			},
		})
			.then(() => {
				toast.success(
					<p>
						<i className="far fa-check-circle" /> Successfully created summary!
					</p>,
				)
				this.setState({ ...this.initState })
			})
			.catch(err => {
				console.error(err)
				toast.error('Error when updating summary. Please try again later.')
			})
	}

	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', marginBottom: 30 }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span>From</span>
					<BibleVerseSelector onChange={linkState(this, 'verse1')} />
					<span>To</span>
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
				<Mutation mutation={CREATE_VERSES_SUMMARY}>
					{createVersesSummary => (
						<button
							style={{ width: '50px' }}
							disabled={!this.state.verse1 || !this.state.verse2}
							onClick={() => {
								this.addSummary(createVersesSummary)
							}}
						>
							Add
						</button>
					)}
				</Mutation>
			</div>
		)
	}
}

export default AddSummaryIndex
