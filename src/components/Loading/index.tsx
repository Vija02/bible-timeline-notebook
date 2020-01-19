import React from 'react'
import 'load-awesome/css/cube-transition.min.css'

import styles from './index.module.css'

export default () => {
	return (
		<div className={styles.container}>
			<div className={`la-cube-transition ${styles.color}`}>
				<div></div>
				<div></div>
			</div>
			<p>Loading...</p>
		</div>
	)
}
