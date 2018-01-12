import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import oldTestament from 'assets/old.json'

import { formatBook } from 'helper'

import Book from './Book'

export default class BookIndex extends Component {
  render() {
    const booksRegex = oldTestament.map(book => formatBook(book)).join('|')
    return (
      <Switch>
        <Route path={`/book/:bookName(${booksRegex})`} component={Book} />
        <Route path={`/book/`} render={() => (
          <Redirect to={`/book/${formatBook(oldTestament[0])}`} />
        )} />
      </Switch>
    );
  }
}