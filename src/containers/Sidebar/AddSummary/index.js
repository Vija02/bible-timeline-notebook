import React, { Component } from 'react'
import { toast } from 'react-toastify'

import Mutation from 'components/Mutation'

import VerseSummaryForm from 'containers/Forms/VerseSummaryForm'

import { AuthConsumer } from 'providers/Auth'

import { bookIdFromName } from 'helper'

import { CREATE_VERSES_SUMMARY } from './queries'
import { ALL_VERSES_SUMMARIES } from 'containers/Home/queries'

class AddSummaryIndex extends Component {
	addSummary(createVersesSummary, userId, data) {
		const { verse1, verse2, title, summary } = data

		return createVersesSummary({
			variables: {
				userId,
				startBookId: bookIdFromName(verse1.book),
				startChapter: verse1.chapter,
				startVerse: verse1.verse,
				endBookId: bookIdFromName(verse2.book),
				endChapter: verse2.chapter,
				endVerse: verse2.verse,
				title,
				summary,
			},
			update: (proxy, res) => {
				const versesSummary = res.data.createVersesSummary.versesSummary

				let updatedData = proxy.readQuery({ query: ALL_VERSES_SUMMARIES })

				updatedData = {
					...updatedData,
					viewer: {
						...updatedData.viewer,
						versesSummaries: {
							...updatedData.viewer.versesSummaries,
							nodes: [
								// Avoid duplication
								...updatedData.viewer.versesSummaries.nodes.filter(
									val => val.nodeId !== versesSummary.nodeId,
								),
								versesSummary,
							],
						},
					},
				}

				proxy.writeQuery({
					query: ALL_VERSES_SUMMARIES,
					data: updatedData,
				})
			},
		})
			.then(() => {
				toast.success(
					<p>
						<i className="far fa-check-circle" /> Successfully created summary!
					</p>,
				)
			})
			.catch(err => {
				console.error(err)
				toast.error('Error when updating summary. Please try again later.')
			})
	}

	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', marginBottom: 30 }}>
				<AuthConsumer>
					{({ userId }) => (
						<Mutation mutation={CREATE_VERSES_SUMMARY}>
							{createVersesSummary => (
								<VerseSummaryForm
									submitLabel="Add"
									onSubmit={data => {
										return this.addSummary(createVersesSummary, userId, data)
									}}
								/>
							)}
						</Mutation>
					)}
				</AuthConsumer>
			</div>
		)
	}
}

export default AddSummaryIndex
