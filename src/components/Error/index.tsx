import React from 'react'

import { ReactComponent as Book } from 'assets/book.svg'

import styles from './index.module.css'

export default () => {
	return (
		<div className={styles.container}>
			<Book width={130} />
			<p className={styles.text}>Sorry, the page failed to load. Please refresh to try again.</p>
		</div>
	)
}
