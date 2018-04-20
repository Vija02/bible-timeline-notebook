import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'

export default class NavbarIndex extends Component {
	render() {
		return (
			<div className={`${this.props.className} ${styles.container}`}>
				<h2>OverRise  <i className="fa fa-arrow-up" /></h2>
				<div className={styles.rightContainer}>
					<Link to="/">About</Link>
					<Link to="/">Login</Link>
				</div>
			</div>
		)
	}
}
