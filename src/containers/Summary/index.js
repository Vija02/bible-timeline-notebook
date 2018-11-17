import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router-dom'

import EditModal from './EditModal'

import Query from 'components/Query'
import { composeReference, bookNameFromId } from 'helper'

import styles from './Summary.module.css'
import { GET_VERSES_SUMMARY } from './queries'

class SummaryIndex extends Component {
	constructor(props) {
		super(props)
		this.state = { editModalOpened: false }

		this.toggleModal = this.toggleModal.bind(this)
	}

	toggleModal() {
		this.setState({ editModalOpened: !this.state.editModalOpened })
	}

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
						id,
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
								{title}
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
								<button onClick={this.toggleModal}>Edit</button>
							</p>
							<p>{summary}</p>
							{this.state.editModalOpened
								? ReactDOM.createPortal(
										<EditModal
											id={id}
											onBackdropClicked={this.toggleModal}
											onDelete={() => {
												this.props.history.replace(
													this.props.history.location.pathname.split('summary')[0],
												)
											}}
											initialValues={{
												verse1: {
													book: bookNameFromId(startBookId),
													chapter: startChapter,
													verse: startVerse,
												},
												verse2: {
													book: bookNameFromId(endBookId),
													chapter: endChapter,
													verse: endVerse,
												},
												title,
												summary,
											}}
										/>,
										document.getElementById('modal-root'),
								  )
								: null}
						</div>
					)
				}}
			</Query>
		)
	}
}

export default SummaryIndex
