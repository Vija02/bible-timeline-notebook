import React, { Component } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import BibleVerseSelector from 'components/BibleVerseSelector'

import { bibleVerseSchema } from 'helper'

import styles from './index.module.css'

export default class VerseSummaryFormIndex extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.validationSchema = Yup.object().shape({
			verse1: bibleVerseSchema,
			verse2: bibleVerseSchema,
			title: Yup.string().required('Title cannot be empty'),
			summary: Yup.string().required('Summary cannot be empty'),
		})
	}

	render() {
		return (
			<Formik
				initialValues={this.props.initialValues}
				validationSchema={this.validationSchema}
				onSubmit={(val, { setSubmitting, resetForm }) => {
					const data = this.validationSchema.cast(val)

					this.props
						.onSubmit(data)
						.then(() => {
							setSubmitting(false)
							resetForm()
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
						setFieldValue,
						setFieldTouched,
						handleBlur,
						handleSubmit,
					} = props

					return (
						<form onSubmit={handleSubmit}>
							<div className={styles.container}>
								<div className={styles.formGroup}>
									<label>From</label>
									<BibleVerseSelector
										id="verse1"
										value={values.verse1}
										onBlur={() => {
											setFieldTouched('verse1', true, true)
										}}
										onChange={val => {
											setFieldValue('verse1', val, true)
										}}
									/>
									{errors.verse1 &&
										touched.verse1 && (
											<div className={styles.inputFeedback}>Bible verse is not valid</div>
										)}
								</div>

								<div className={styles.formGroup}>
									<label>To</label>
									<BibleVerseSelector
										id="verse2"
										value={values.verse2}
										onBlur={() => {
											setFieldTouched('verse2', true, true)
										}}
										onChange={val => {
											setFieldValue('verse2', val, true)
										}}
									/>
									{errors.verse2 &&
										touched.verse2 && (
											<div className={styles.inputFeedback}>Bible verse is not valid</div>
										)}
								</div>

								<div className={styles.formGroup}>
									<label>Title</label>
									<input
										id="title"
										type="text"
										value={values.title}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{errors.title &&
										touched.title && <div className={styles.inputFeedback}>{errors.title}</div>}
								</div>

								<div className={styles.formGroup}>
									<label>Summary</label>
									<textarea
										id="summary"
										style={{ height: '100px' }}
										value={values.summary}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{errors.summary &&
										touched.summary && <div className={styles.inputFeedback}>{errors.summary}</div>}
								</div>

								<div className="mb20">
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

VerseSummaryFormIndex.defaultProps = {
	initialValues: { verse1: {}, verse2: {}, title: '', summary: '' },
	submitLabel: 'Submit',
	onSubmit: Promise.resolve(),
}
