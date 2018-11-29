import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Raven from 'raven-js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Modal from 'components/Modal'

import LoginForm from 'containers/Forms/LoginForm'
import RegisterForm from 'containers/Forms/RegisterForm'

import { AuthConsumer } from 'providers/Auth'

export default class LoginModal extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.login = this.login.bind(this)
		this.register = this.register.bind(this)
	}

	login(onLogin) {
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

	register({ email, password }) {
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

	render() {
		return (
			<Modal
				onBackdropClicked={() => {
					this.props.onBackdropClicked()
				}}
			>
				<Tabs>
					<TabList>
						<Tab>Login</Tab>
						<Tab>Register</Tab>
					</TabList>

					<TabPanel>
						<AuthConsumer>
							{({ onLogin }) => (
								<LoginForm
									onSubmit={data => {
										return this.login(onLogin)(data).then(() => {
											this.props.onBackdropClicked()
										})
									}}
								/>
							)}
						</AuthConsumer>
					</TabPanel>

					<TabPanel>
						<RegisterForm
							onSubmit={data => {
								return this.register(data).then(() => {
									toast.success(
										<p>
											<i className="far fa-check-circle" /> Successfully registered! Please login
											to continue.
										</p>,
									)
									this.props.onBackdropClicked()
								})
							}}
						/>
					</TabPanel>
				</Tabs>
			</Modal>
		)
	}
}
