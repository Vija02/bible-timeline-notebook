import React, { Component } from 'react';

import AddSummary from './AddSummary'

import styles from './Sidebar.module.css'

export default class SideBarIndex extends Component {
  render() {
    return (
      <div className={`${this.props.className} ${styles.container}`}>
        <div className={styles.sidebarTop}>
          <a className={styles.sidebarTopText}>Welcome</a>
        </div>
        <div className={styles.dropdown}>
          <AddSummary />
        </div>
      </div>
    );
  }
}