import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

import LoginModal from './LoginModal'

import { AuthConsumer } from 'providers/Auth'

import styles from './Navbar.module.css'

export default class NavbarIndex extends Component {
	constructor(props) {
		super(props)
		this.state = { opened: false }

		this.toggleModal = this.toggleModal.bind(this)
	}

	toggleModal() {
		this.setState({ opened: !this.state.opened })
	}

	render() {
		return (
			<div className={`${this.props.className} ${styles.container}`}>
				<Link to="/">
					<h2>
						OverRise <i className="fa fa-arrow-up" />
					</h2>
				</Link>
				<AuthConsumer>
					{({ onLogout, userId }) => (
						<div className={styles.rightContainer}>
							<Link to="/">About</Link>
							{userId >= 0 ? (
								<span onClick={onLogout}>Logout</span>
							) : (
								<span onClick={this.toggleModal}>Login</span>
							)}
							{this.state.opened
								? ReactDOM.createPortal(
										<LoginModal onBackdropClicked={this.toggleModal} />,
										document.getElementById('modal-root'),
								  )
								: null}
						</div>
					)}
				</AuthConsumer>
			</div>
		)
	}
}
