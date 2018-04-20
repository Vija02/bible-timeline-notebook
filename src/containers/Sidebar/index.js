import React, { Component } from 'react';

import DropdownMenu from 'components/DropdownMenu'

import AddSummary from './AddSummary'

import styles from './Sidebar.module.css'

export default class SideBarIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };
  }
  render() {
    return (
      <div className={`${this.props.className} ${styles.container}`}>
        <DropdownMenu
          iconClassName="fas fa-plus"
          title="Add Summary"
          onClick={() => { this.setState({ opened: !this.state.opened }) }}
          opened={this.state.opened}
        >
          <AddSummary />
        </DropdownMenu>
      </div>
    );
  }
}