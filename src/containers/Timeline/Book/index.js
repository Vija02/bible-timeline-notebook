import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { formatBook, booksRegex } from 'helper'
import bookData from 'assets/book_metadata.json'

import Book from './Book'

export default class BookIndex extends Component {
	render() {
		return (
			<Switch>
				<Route path={`/book/:bookName(${booksRegex})`} component={Book} />
				<Route path={`/book/`} render={() => <Redirect to={`/book/${formatBook(bookData[0].bookName)}`} />} />
			</Switch>
		)
	}
}
