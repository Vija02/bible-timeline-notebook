import React, { Component } from 'react'

import styles from './Modal.module.css'

export default class ModelIndex extends Component {
	render() {
		return (
			<div
        className={styles.container}
				onClick={() => {
					this.props.onBackdropClicked()
				}}
			>
				<div
					className={styles.modalBox}
					onClick={e => {
						e.stopPropagation()
					}}
				>
					{this.props.children}
				</div>
			</div>
		)
	}
}
