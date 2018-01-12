import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Book from 'containers/Book'

import MainTimeline from './MainTimeline'

export default class HomeIndex extends Component {
  render() {
    return [
      <MainTimeline {...this.props} />,
      <Switch>
        <Route path="/book" component={Book} />
      </Switch>
    ];
  }
}