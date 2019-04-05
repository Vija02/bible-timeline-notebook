import React from 'react'

import ContactForm from 'containers/Forms/ContactForm'

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
							<ContactForm onSubmit={() => {}} />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
