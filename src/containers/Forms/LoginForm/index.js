import React, { Component } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import styles from './index.module.css'

export default class LoginFormIndex extends Component {
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
	}

	render() {
		return (
			<Formik
				initialValues={this.props.initialValues}
				validationSchema={this.validationSchema}
				onSubmit={(val, { setSubmitting }) => {
					const data = this.validationSchema.cast(val)

					this.props
						.onSubmit(data)
						.then(() => {
							setSubmitting(false)
						})
						.catch(() => {
							setSubmitting(false)
						})
				}}
			>
				{props => {
					const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props
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
									{errors.email && touched.email && (
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
									{errors.password && touched.password && (
										<div className="input-feedback">{errors.password}</div>
									)}
								</div>
								<p className={styles.toggleLogin} onClick={() => this.props.registerPage()}>
									Don't have an account? <span>Register now!</span>
								</p>
								<div className={styles.buttonContainer}>
									<button type="submit" className="btn" disabled={isSubmitting}>
										{this.props.submitLabel}
									</button>
								</div>
							</div>
						</form>
					)
				}}
			</Formik>
		)
	}
}

LoginFormIndex.defaultProps = {
	initialValues: { email: '', password: '' },
	submitLabel: 'Sign In',
	onSubmit: Promise.resolve(),
	registerPage: () => {},
}
