import React, { Component } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import styles from './index.module.css'

export default class RegisterFormIndex extends Component {
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
			confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Confirm password must be the same as password'),
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
									{errors.email &&
										touched.email && <div className="input-feedback">{errors.email}</div>}
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
										touched.password && <div className="input-feedback">{errors.password}</div>}
								</div>
								<div className={styles.formGroup}>
									<label>Confirm Password</label>
									<input
										id="confirmPassword"
										type="password"
										className="form-control"
										value={values.confirmPassword}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{errors.confirmPassword &&
										touched.confirmPassword && (
											<div className="input-feedback">{errors.confirmPassword}</div>
										)}
								</div>
								<div>
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

RegisterFormIndex.defaultProps = {
	initialValues: { email: '', password: '', confirmPassword: '' },
	submitLabel: 'Register',
	onSubmit: Promise.resolve(),
}
