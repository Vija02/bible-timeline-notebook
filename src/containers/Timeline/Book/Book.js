import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import linkState from 'linkstate'

import { bookIdFromName, unformatBook } from 'helper'
import styles from './Book.module.css'

import NoSummary from './NoSummary'

import bookOverview from 'assets/book_overview.json'

class Book extends Component {
	constructor(props) {
		super(props)
		this.state = { editing: false, bookSummary: '' }
	}
	componentWillUpdate(nextProps, nextState) {
		if (this.props.data.bookSummary !== nextProps.data.bookSummary) {
			this.setState({ bookSummary: nextProps.data.bookSummary ? nextProps.data.bookSummary.summary : '' })
		}
	}

	onConfirm() {
		this.props
			.upsertBookSummary({
				bookId: bookIdFromName(this.props.match.params.bookName),
				summary: this.state.bookSummary,
			})
			.then(() => {
				this.setState({ editing: false })
			})
			.catch(err => {
				console.log(err)
				alert('Error when updating summary. Please try again later.')
			})
	}

	render() {
		const { loading, error } = this.props.data

		return (
			<div className={styles.bookContainer}>
				<h3 className={styles.title}>{unformatBook(this.props.match.params.bookName)}</h3>
				<h4>Overview</h4>
				<span className={styles.text}>
					{
						bookOverview.find(data => data.bookId === bookIdFromName(this.props.match.params.bookName))
							.overview
					}
				</span>
				<h4>
					Summary{' '}
					<div
						className={styles.editButtonContainer}
						onClick={() => {
							this.setState({ editing: !this.state.editing })
						}}
					>
						<i className={`fas fa-edit ${styles.editButton}`} />
					</div>
				</h4>
				{!loading && !error && !this.props.data.bookSummary ? (
					<NoSummary
						onAdd={() => {
							this.setState({ editing: !this.state.editing })
						}}
					/>
				) : null}
				{this.state.editing ? (
					<div className={styles.editBookContainer}>
						<textarea
							value={this.state.bookSummary}
							onChange={linkState(this, 'bookSummary')}
							className={styles.editBox}
						/>
						<button
							onClick={() => {
								this.onConfirm()
							}}
						>
							Confirm
						</button>
					</div>
				) : loading || error ? (
					<span>-</span>
				) : this.props.data.bookSummary ? (
					<span>{this.props.data.bookSummary.summary}</span>
				) : null}
			</div>
		)
	}
}

// TODO: Change to get from current user
const GetBookSummaryQuery = gql`
	query($bookId: Int!) {
		bookSummary: bookSummaryByUserIdAndBookId(userId: 1, bookId: $bookId) {
			nodeId
			summary
		}
	}
`

export default compose(
	graphql(
		gql`
			mutation($bookId: Int!, $summary: String!) {
				upsertBookSummary(input: { bookId: $bookId, summary: $summary }) {
					bookSummary {
						nodeId
						summary
					}
				}
			}
		`,
		{
			props: ({ mutate }) => ({
				upsertBookSummary: ({ bookId, summary }) =>
					mutate({
						variables: { bookId, summary },
						update: (proxy, { data: { upsertBookSummary } }) => {
							const data = proxy.readQuery({ query: GetBookSummaryQuery, variables: { bookId } })
							data.bookSummary = upsertBookSummary.bookSummary
							proxy.writeQuery({ query: GetBookSummaryQuery, variables: { bookId }, data })
						},
					}),
			}),
		},
	),
	graphql(GetBookSummaryQuery, {
		options: ({ match }) => ({
			variables: { bookId: bookIdFromName(match.params.bookName) },
		}),
	}),
)(Book)