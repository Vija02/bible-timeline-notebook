import React, { Component } from 'react'

import DropdownMenu from 'components/DropdownMenu'

import AddSummary from './AddSummary'

import styles from './Sidebar.module.css'

export default class SideBarIndex extends Component {
	constructor(props) {
		super(props)
		this.state = { opened: false }
	}
	render() {
		return (
			<div className={`${this.props.className} ${styles.container}`}>
				<div className={styles.topContainer}>
					<DropdownMenu
						iconClassName="fas fa-plus"
						title="Add Summary"
						onClick={() => {
							this.setState({ opened: !this.state.opened })
						}}
						opened={this.state.opened}
					>
						<AddSummary />
					</DropdownMenu>
					<div style={{ paddingLeft: 15, paddingRight: 15 }}>
						<h2>Notice</h2>
						<p>The project is currently on progress. Certain features might or might not work.</p>
					</div>
				</div>
				<a
					href="https://github.com/Vija02/bible-timeline-notebook"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.bottomContainer}
				>
					View on Github <i className="fab fa-github" />
				</a>
			</div>
		)
	}
}
