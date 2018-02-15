import React, { Component } from 'react';

import DropdownMenu from 'components/DropdownMenu'

import styles from './Sidebar.module.css'

export default class SideBarIndex extends Component {
  render() {
    return (
      <div className={`${this.props.className} ${styles.container}`}>
        <div className={styles.sidebarTop}>
          <a className={styles.sidebarTopText}>Welcome</a>
        </div>
        <DropdownMenu
          iconClassName="fas fa-plus"
          title="Add Summary"
        >
        </DropdownMenu>
      </div>
    );
  }
}