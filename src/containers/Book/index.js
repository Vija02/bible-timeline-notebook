import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import { formatBook, oldTestament, booksRegex } from 'helper'

import Book from './Book'

export default class BookIndex extends Component {
  render() {
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