import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Book from 'containers/Book'
import Sidebar from 'containers/Sidebar'

import MainTimeline from './MainTimeline'

import styles from './Home.module.css'

export default class HomeIndex extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Sidebar className={styles.sidebar} />
        <MainTimeline className={styles.main} />
        <div className={styles.bottom}>
          <Switch>
            <Route path="/book" component={Book} />
          </Switch>
        </div>
      </div>
    );
  }
}