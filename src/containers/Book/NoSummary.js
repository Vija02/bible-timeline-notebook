import React, { Component } from 'react'

import styles from './NoSummary.module.css'

export default class NoSummary extends Component {
	render() {
		return (
			<React.Fragment>
				<div className={styles.container}>
					<div>
						<i className={`fa fa-exclamation-circle ${styles.icon}`} />
						<a>Empty summary</a>
					</div>
					<a className={styles.clickableAction} onClick={this.props.onAdd}>Add now</a>
				</div>
				<br />
			</React.Fragment>
		)
	}
}
