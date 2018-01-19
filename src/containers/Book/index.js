import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import bookData from 'assets/book_metadata.json'

import { formatBook } from 'helper'

import Book from './Book'

const oldTestament = bookData.filter(book => book.bookSection === "OT")

export default class BookIndex extends Component {
  render() {
    const booksRegex = oldTestament.map(book => formatBook(book.bookName)).join('|')
    return (
      <Switch>
        <Route path={`/book/:bookName(${booksRegex})`} component={Book} />
        <Route path={`/book/`} render={() => (
          <Redirect to={`/book/${formatBook(oldTestament[0].bookName)}`} />
        )} />
      </Switch>
    );
  }
}