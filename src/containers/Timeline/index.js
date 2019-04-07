import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Book from './Book'
import Summary from './Summary'
import Sidebar from './Sidebar'
import Navbar from 'containers/Navbar'

import MainTimeline from './MainTimeline'

import styles from './Home.module.css'

export default class HomeIndex extends Component {
	render() {
		return (
			<div
				className={
					this.props.location.pathname.indexOf('/book/') === 0
						? styles.containerAside
						: styles.containerNoAside
				}
			>
				<Navbar className={styles.navbar} />
				<Sidebar className={styles.sidebar} />
				<MainTimeline className={styles.main} />
				<div className={styles.aside}>
					<Route path="/book" component={Book} />
				</div>
				<div className={styles.bottom}>
					<Route path="/summary/:id(\d+)" component={Summary} />
					<Route path="/book/:bookName/summary/:id(\d+)" component={Summary} />
				</div>
			</div>
		)
	}
}
