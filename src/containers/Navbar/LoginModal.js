import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Raven from 'raven-js'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Modal from 'components/Modal'

import { AuthConsumer } from 'providers/Auth'

import styles from './LoginModal.module.css'

export default class LoginModal extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.validationSchema = Yup.object().shape({
			email: Yup.string()
				.email('Invalid Email')
				.required('Email cannot be empty'),
			password: Yup.string()
				.min(4, 'Password length at least 4')
				.required('Password cannot be empty'),
		})

		this.login = this.login.bind(this)
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

	render() {
		return (
			<Modal
				onBackdropClicked={() => {
					this.props.onBackdropClicked()
				}}
			>
				<AuthConsumer>
					{({ onLogin }) => (
						<Formik
							initialValues={{ email: '', password: '' }}
							validationSchema={this.validationSchema}
							onSubmit={(val, { setSubmitting }) => {
								const data = this.validationSchema.cast(val)

								this.login(onLogin)(data)
									.then(() => {
										setSubmitting(false)
										this.props.onBackdropClicked()
									})
									.catch(() => {
										setSubmitting(false)
									})
							}}
						>
							{props => {
								const {
									values,
									touched,
									errors,
									isSubmitting,
									handleChange,
									handleBlur,
									handleSubmit,
								} = props
								return (
									<form onSubmit={handleSubmit}>
										<div className={styles.modalContainer}>
											<div className={styles.formGroup}>
												<label>Email</label>
												<input
													id="email"
													type="text"
													className="form-control"
													value={values.email}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												{errors.email &&
													touched.email && (
														<div className="input-feedback">{errors.email}</div>
													)}
											</div>
											<div className={styles.formGroup}>
												<label>Password</label>
												<input
													id="password"
													type="password"
													className="form-control"
													value={values.password}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												{errors.password &&
													touched.password && (
														<div className="input-feedback">{errors.password}</div>
													)}
											</div>
											<div className="mb20">
												<button type="submit" className="btn" disabled={isSubmitting}>
													Sign In
												</button>
											</div>
										</div>
									</form>
								)
							}}
						</Formik>
					)}
				</AuthConsumer>
			</Modal>
		)
	}
}
