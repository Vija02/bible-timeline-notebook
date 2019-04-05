import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import AbsoluteAnimatedSwitch from 'components/AbsoluteAnimatedSwitch'
import getApolloClient from 'getApolloClient'
import AuthProvider from 'providers/Auth'
import { getUserIdFromJWT } from 'helper'

import About from './About'
import Home from './Home'
import ContactMe from './ContactMe'
import Navbar from './Navbar'
import Footer from './Footer'

class Root extends Component {
	constructor(props) {
		super(props)
		this.state = { jwt: null }

		this.onLogin = this.onLogin.bind(this)
		this.onLogout = this.onLogout.bind(this)
	}
	componentWillMount() {
		const jwt = localStorage.getItem(process.env.REACT_APP_JWT_KEY_NAME)
		this.setState({ jwt })
	}
	onLogin(jwt) {
		localStorage.setItem(process.env.REACT_APP_JWT_KEY_NAME, jwt)
		this.setState({ jwt })
		toast.success(
			<p>
				<i className="far fa-check-circle" /> You are now logged in!
			</p>,
		)
	}
	onLogout(showMessage = false) {
		localStorage.removeItem(process.env.REACT_APP_JWT_KEY_NAME)
		if (this.state.jwt !== null) {
			this.setState({ jwt: null })
		}
		if (showMessage) {
			toast.info(
				<p>
					<i className="fas fa-exclamation-circle" /> You have successfully logged out.
				</p>,
			)
		}
	}

	render() {
		return (
			<AuthProvider
				value={{
					onLogin: this.onLogin,
					onLogout: this.onLogout,
					userId: getUserIdFromJWT(this.state.jwt),
					jwt: this.state.jwt,
				}}
			>
				<ApolloProvider
					client={getApolloClient(() => {
						console.log('Logout due to expiry')
						if (this.state.jwt !== null) {
							toast.warn('You have been logged out. Current login session expired.')
						}
						this.onLogout()
					}, this.state.jwt)}
				>
					<Router>
						<>
							<Navbar />
							<AbsoluteAnimatedSwitch className="flex">
								<Route path="/about" component={About} />
								<Route path="/contact-me" component={ContactMe} />
								{/* Only allow past here if logged in */}
								{!this.state.jwt ? <Redirect to="/about" /> : null}
								<Route path="/" component={Home} />
							</AbsoluteAnimatedSwitch>
							<Footer />
							<div id="modal-root" />
							<ToastContainer
								position="top-right"
								autoClose={5000}
								hideProgressBar={false}
								newestOnTop
								closeOnClick
								rtl={false}
								pauseOnVisibilityChange
								draggable
								pauseOnHover
							/>
						</>
					</Router>
				</ApolloProvider>
			</AuthProvider>
		)
	}
}

export default Root
