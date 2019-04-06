import React from 'react'
import { toast } from 'react-toastify'

import ContactForm from 'containers/Forms/ContactForm'

import sendMail from 'helper/sendMail'

import styles from './index.module.css'

export default () => {
	return (
		<>
			<div className={styles.bodyContainer}>
				<div className={styles.cardContainer}>
					<div className={styles.cardBodyFlex}>
						<div className={styles.contactMeContainer}>
							<h1>Contact Me</h1>
							<p>Feel free to send me anything! Feedback and suggestion welcomed.</p>
							<h3>My Website</h3>
							<a href="https://michaelsalim.co.uk">https://michaelsalim.co.uk</a>
							<h3>E-Mail</h3>
							<p>salim.michaelmi@gmail.com</p>
							<h3>Github</h3>
							<p>File an issue in Github if website related</p>
							<a href="https://github.com/overriseapp/overrise-web">
								https://github.com/overriseapp/overrise-web
							</a>
						</div>
						<div className={styles.sendMessageContainer}>
							<h3>SEND ME A MESSAGE</h3>
							<ContactForm
								onSubmit={data => {
									const body = data.message.replace(/(?:\r\n|\r|\n)/g, '<br>')

									return sendMail({
										Subject: `Overrise Contact Form: ${data.subject}`,
										Body: `Name: ${data.name}<br>Email: ${data.email}<br>Message: ${body}`,
									})
										.then(() => {
											toast.success(
												'Message successfully sent! I will be in touch as soon as possible, Thank you.',
											)
										})
										.catch(() => {
											toast.error(
												'Failed to send message. If this continues, please contact me through email or other medium.',
											)
										})
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
