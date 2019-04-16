import React from 'react'

export default ({ youtubeId, ...rest }) => {
	return (
		<div
			className="video"
			style={{
				position: 'relative',
				paddingBottom: '56.25%' /* 16:9 */,
				paddingTop: 25,
				height: 0,
			}}
			{...rest}
		>
			<iframe
				title="Bible Project Youtube Video"
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
				}}
				src={`https://www.youtube.com/embed/${youtubeId}`}
				frameBorder="0"
			/>
		</div>
	)
}
