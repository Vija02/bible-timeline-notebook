import React from 'react'
import { Link } from 'react-router-dom'

import styles from './index.module.css'

export default () => {
	return (
		<div className={styles.footerContainer}>
			<div>
				<h4 className={styles.footerTitle}>OTHER LINKS</h4>
				<p>
					<Link className={styles.footerLink} to="/">
						Home
					</Link>
				</p>
				<p>
					<Link className={styles.footerLink} to="/contact-me">
						Contact Me/Feedback
					</Link>
				</p>
				<p>
					<a
						className={styles.footerLink}
						href="https://github.com/overriseapp/overrise-web"
						target="_blank"
						rel="noopener noreferrer"
					>
						Github
					</a>
				</p>
			</div>
			<span className={styles.footerCopyright}>©{new Date().getFullYear()} OverRise</span>
		</div>
	)
}
