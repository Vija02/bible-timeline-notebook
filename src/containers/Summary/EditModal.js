import React, { Component } from 'react'
import { toast } from 'react-toastify'

import Mutation from 'components/Mutation'
import Modal from 'components/Modal'

import VerseSummaryForm from 'containers/Forms/VerseSummaryForm'

import { bookIdFromName } from 'helper'

import { UPDATE_VERSE_SUMMARY } from './queries'
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

	render() {
		return (
			<Modal
				onBackdropClicked={() => {
					this.props.onBackdropClicked()
				}}
			>
				<Mutation mutation={UPDATE_VERSE_SUMMARY}>
					{updateVerseSummary => (
						<React.Fragment>
							<h3 style={{ marginTop: 0 }}>Edit Summary</h3>
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
			</Modal>
		)
	}
}
