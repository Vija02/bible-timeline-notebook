import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'containers/Navbar'

import styles from './index.module.css'

export default class AboutIndex extends Component {
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.gradient}>
					<Navbar />
					<div className={styles.headerContainer}>
						<h1>Discover, Explore, and Note down your life lessons.</h1>
						<h3>Save your thoughts and the lessons learned the scripture. Never forget it ever again!</h3>
						<div className={styles.buttonsContainer}>
							<Link to="/">
								Start Now
							</Link>
							<Link to="/">
								Test Demo
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
