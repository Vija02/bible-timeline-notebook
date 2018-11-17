import React, { Component } from 'react'
import { toast } from 'react-toastify'

import Mutation from 'components/Mutation'
import Modal from 'components/Modal'

import VerseSummaryForm from 'containers/Forms/VerseSummaryForm'

import { bookIdFromName } from 'helper'

import { UPDATE_VERSE_SUMMARY, DELETE_VERSE_SUMMARY } from './queries'
import { ALL_VERSES_SUMMARIES } from 'containers/Home/queries'

export default class SummaryEditModal extends Component {
	editSummary(updateVerseSummary, data) {
		const { verse1, verse2, title, summary } = data

		return updateVerseSummary({
			variables: {
				id: this.props.id,
				startBookId: bookIdFromName(verse1.book),
				startChapter: verse1.chapter,
				startVerse: verse1.verse,
				endBookId: bookIdFromName(verse2.book),
				endChapter: verse2.chapter,
				endVerse: verse2.verse,
				title,
				summary,
			},
		})
			.then(() => {
				toast.success(
					<p>
						<i className="far fa-check-circle" /> Successfully changed summary!
					</p>,
				)
			})
			.catch(err => {
				console.error(err)
				toast.error('Error when updating summary. Please try again later.')
			})
	}

	deleteSummary(deleteVerseSummary) {
		return deleteVerseSummary({
			variables: { id: this.props.id },
			update: (proxy, res) => {
				const versesSummaryId = res.data.deleteVersesSummaryById.deletedVersesSummaryId

				let updatedData = proxy.readQuery({ query: ALL_VERSES_SUMMARIES })

				updatedData = {
					...updatedData,
					viewer: {
						...updatedData.viewer,
						versesSummaries: {
							...updatedData.viewer.versesSummaries,
							nodes: [
								// Everything else except the deleted summary
								...updatedData.viewer.versesSummaries.nodes.filter(
									val => val.nodeId !== versesSummaryId,
								),
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
						<i className="far fa-check-circle" /> Successfully deleted summary!
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
			<Modal
				onBackdropClicked={() => {
					this.props.onBackdropClicked()
				}}
			>
				<Mutation mutation={DELETE_VERSE_SUMMARY}>
					{deleteVerseSummary => (
						<Mutation mutation={UPDATE_VERSE_SUMMARY}>
							{updateVerseSummary => (
								<React.Fragment>
									<h3 style={{ marginTop: 0, display: 'inline' }}>Edit Summary</h3>
									<button
										style={{
											color: 'white',
											backgroundColor: '#f64846',
											padding: 5,
											border: 0,
											cursor: 'pointer',
										}}
										onClick={() => {
											return this.deleteSummary(deleteVerseSummary).then(() => {
												// This will unmount, so no need to close modal
												this.props.onDelete()
											})
										}}
									>
										Delete
									</button>
									<VerseSummaryForm
										submitLabel="Edit"
										initialValues={this.props.initialValues}
										onSubmit={data => {
											return this.editSummary(updateVerseSummary, data).then(() => {
												this.props.onBackdropClicked()
											})
										}}
									/>
								</React.Fragment>
							)}
						</Mutation>
					)}
				</Mutation>
			</Modal>
		)
	}
}
