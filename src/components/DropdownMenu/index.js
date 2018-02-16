import React, { Component } from 'react';

import styles from './DropdownMenu.module.css'

export default class DropdownMenuIndex extends Component {
  render() {
    return (
      <div>
        <div className={`${styles.dropdown}${this.props.opened ? "-open" : ""}`} onClick={this.props.onClick}>
          <i className={this.props.iconClassName} />
          <a className={`${styles.title}${this.props.opened ? "-open" : ""}`}>{this.props.title}</a>
        </div>
        <div className={this.props.opened ? styles.body : styles.closedBody}>
          {
            this.props.opened ?
              React.cloneElement(this.props.children)
              : null
          }
        </div>
      </div>
    );
  }
}

DropdownMenuIndex.defaultProps = { iconClassName: "", title: "", opened: false, onClick: () => { } }