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
						<h2 className={styles.scripture}>
							<i>
								"My son, do NOT forget my teaching, but keep my commands in your heart, for they will
								prolong your life many years and bring you peace and prosperity."
							</i>{' '}
							Proverbs 3:1-2(NIV)
						</h2>
						<div className={styles.buttonsContainer}>
							<h1>Face it, everyone forgets</h1>
							<h3>Let's change that now</h3>
							<Link to="/">Start Now</Link>
							<Link to="/">Test Demo</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
