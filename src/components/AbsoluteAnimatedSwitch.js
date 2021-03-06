import React from 'react'
import { AnimatedSwitch } from 'react-router-transition'

export default props => {
	return (
		<AnimatedSwitch
			atEnter={{
				opacity: 0,
				foo: 0,
			}}
			atLeave={{
				opacity: 0,
				foo: 2,
			}}
			atActive={{
				opacity: 1,
				foo: 1,
			}}
			mapStyles={styles => {
				return {
					position: styles.foo <= 1 ? 'relative' : 'absolute',
					width: '100%',
					height: '100%',
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					opacity: styles.opacity,
				}
			}}
			className="animated-switch"
			{...props}
		>
			{props.children}
		</AnimatedSwitch>
	)
}
