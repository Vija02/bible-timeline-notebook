import React, { Component } from 'react'

import styles from './NoSummary.module.css'

export default class NoSummary extends Component {
	render() {
		return (
			<React.Fragment>
				<div className={styles.container}>
					<div>
						<i className={`fa fa-exclamation-circle ${styles.icon}`} />
						<span>Empty summary</span>
					</div>
					<span className={styles.clickableAction} onClick={this.props.onAdd}>Add now</span>
				</div>
				<br />
			</React.Fragment>
		)
	}
}
