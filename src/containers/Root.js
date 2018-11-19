import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import getApolloClient from 'getApolloClient'
import AuthProvider from 'providers/Auth'
import { getUserIdFromJWT } from 'helper'

import About from './About'
import Home from './Home'

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
						<div>
							<Switch>
								<Route path="/about" component={About} />
								<Route path="/" component={Home} />
							</Switch>
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
						</div>
					</Router>
				</ApolloProvider>
			</AuthProvider>
		)
	}
}

export default Root
