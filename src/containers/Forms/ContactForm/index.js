import React, { Component } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import styles from './index.module.css'

export default class ContactFormIndex extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.validationSchema = Yup.object().shape({
			name: Yup.string().ensure(),
			email: Yup.string()
				.email('Please enter a valid email')
				.required('Please enter an email address'),
			subject: Yup.string().ensure(),
			message: Yup.string().required('Please enter the message to send'),
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
							<div className={styles.container}>
								<div className={styles.formGroup}>
									<label>Name</label>
									<input
										id="name"
										type="text"
										className="form-control"
										value={values.name}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}
								</div>
								<div className={styles.formGroup}>
									<label>E-mail</label>
									<input
										id="email"
										type="email"
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
									<label>Subject</label>
									<input
										id="subject"
										type="text"
										className="form-control"
										value={values.subject}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{errors.subject && touched.subject && (
										<div className="input-feedback">{errors.subject}</div>
									)}
								</div>
								<div className={styles.formGroup}>
									<label>Message</label>
									<textarea
										id="message"
										type="text"
										className="form-control"
										value={values.message}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{errors.message && touched.message && (
										<div className="input-feedback">{errors.message}</div>
									)}
								</div>
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

ContactFormIndex.defaultProps = {
	initialValues: { name: '', email: '', subject: '', message: '' },
	submitLabel: 'Send Message',
	onSubmit: Promise.resolve(),
}
