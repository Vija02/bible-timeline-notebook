import React, { Component, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Collapsible from 'react-collapsible'

import styles from './index.module.css'

export default class ChapterSummaryFormIndex extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.validationSchema = Yup.object().shape({
			summary: Yup.string().required('Please enter something above.'),
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
									<textarea
										id="summary"
										type="text"
										className="form-control"
										value={values.summary}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{errors.summary && touched.summary && (
										<div className="input-feedback">{errors.summary}</div>
									)}
								</div>
								<SubmitButton submitLabel={this.props.submitLabel} isSubmitting={isSubmitting} />
							</div>
						</form>
					)
				}}
			</Formik>
		)
	}
}

ChapterSummaryFormIndex.defaultProps = {
	initialValues: { summary: '' },
	submitLabel: 'Submit',
	onSubmit: Promise.resolve(),
}

const SubmitButton = ({ submitLabel, isSubmitting }) => {
	const [showHelp, setShowHelp] = useState(false)

	return (
		<>
			<div className={styles.buttonContainer}>
				<p onClick={() => setShowHelp(!showHelp)}>Help, I don't know what to write</p>
				<button type="submit" className="btn" disabled={isSubmitting}>
					{submitLabel}
				</button>
			</div>
			<Collapsible open={showHelp}>
				<div className={styles.helpContainer}>
					<span>
						We encourage you to write text that are simple and personal. This is all about what the
						scripture say to YOU. Posts that are too academic are not the goal of this website and should be
						posted somewhere else.
						<br />
						<br />
						Write your insights, comments, experiences. Anything goes.
						<br />
						<br />
						Some question that might help you get started:
						<br />
						1. What is the story behind this chapter? When does this take place and why?
						<br />
						2. Are there any verses that caught your attention? <br />
						3. Are there anything that reminds you of your previous experiences?
					</span>
				</div>
			</Collapsible>
		</>
	)
}
