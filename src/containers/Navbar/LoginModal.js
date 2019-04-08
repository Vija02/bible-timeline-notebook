import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Raven from 'raven-js'
import { Route } from 'react-router-dom'

import Modal from 'components/Modal'
import AbsoluteAnimatedSwitch from 'components/AbsoluteAnimatedSwitch'

import LoginForm from 'containers/Forms/LoginForm'
import RegisterForm from 'containers/Forms/RegisterForm'

import { AuthConsumer } from 'providers/Auth'

import styles from './LoginModal.module.css'

const login = onLogin => {
	return ({ email, password }) => {
		return axios
			.post(process.env.REACT_APP_API_ENDPOINT + '/login', {
				email,
				password,
			})
			.then(res => {
				return res.data.jwt
			})
			.then(onLogin)
			.catch(err => {
				console.error(err)

				if (err.response) {
					switch (err.response.status) {
						case 400:
							toast.error('Bad request sent. Please check your email and password')
							break
						case 401:
							toast.error('Invalid email or password. Please check your email or password')
							break
						case 500:
						default:
							toast.error('Something went wrong. Please try again later')
					}
				} else if (err.request) {
					Raven.captureException(new Error(JSON.stringify(err)))
					toast.error("Server didn't respond in time. Please try again later")
				} else {
					Raven.captureException(new Error(JSON.stringify(err)))
					toast.error('An unknown error occured')
				}
				throw new Error()
			})
	}
}

const register = ({ email, password }) => {
	return axios
		.post(process.env.REACT_APP_API_ENDPOINT + '/register', {
			// For now we don't need names. In the future it'll probably be nice to prompt display name.
			// And maybe even first and last name as optional info
			first_name: '',
			last_name: '',
			email,
			password,
		})
		.catch(err => {
			console.error(err)

			if (err.response) {
				switch (err.response.status) {
					case 400:
						toast.error('Bad request sent. Please try again with different email/password')
						break
					case 403:
						toast.error('Email registered. Please login or register with another email')
						break
					case 500:
					default:
						toast.error('Something went wrong. Please try again later')
				}
			} else if (err.request) {
				Raven.captureException(new Error(JSON.stringify(err)))
				toast.error("Server didn't respond in time. Please try again later")
			} else {
				Raven.captureException(new Error(JSON.stringify(err)))
				toast.error('An unknown error occured')
			}
			throw new Error()
		})
}

export default props => {
	const [page, setPage] = useState('/login')

	return (
		<Modal
			onBackdropClicked={() => {
				props.onBackdropClicked()
			}}
		>
			<AbsoluteAnimatedSwitch location={{ pathname: page }}>
				<Route
					path="/register"
					exact
					render={() => (
						<>
							<p className={styles.title}>Register</p>
							<RegisterForm
								loginPage={() => {
									setPage('/login')
								}}
								onSubmit={data => {
									return register(data).then(() => {
										toast.success(
											<p>
												<i className="far fa-check-circle" /> Successfully registered! Please
												login to continue.
											</p>,
										)
										props.onBackdropClicked()
									})
								}}
							/>
						</>
					)}
				/>
				<Route
					path="/"
					render={() => (
						<>
							<p className={styles.title}>Login</p>
							<AuthConsumer>
								{({ onLogin }) => (
									<LoginForm
										registerPage={() => {
											setPage('/register')
										}}
										onSubmit={data => {
											return login(onLogin)(data).then(() => {
												props.onBackdropClicked()
											})
										}}
									/>
								)}
							</AuthConsumer>
						</>
					)}
				/>
			</AbsoluteAnimatedSwitch>
		</Modal>
	)
}
