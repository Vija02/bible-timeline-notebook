import React, { Component } from 'react'

import styles from './SummaryContainer.module.css'

export default class SummaryContainer extends Component {
	render() {
		return (
			<div className={styles.scrollerSummaryContainer}>
				{this.props.summaries.map((summary, i) => {
					const { offset, width, title } = summary
					return (
						<div style={{ width: offset * 2 + width }} key={`summary_${i}`}>
							<div
								style={{
									marginLeft: offset,
									width: width,
									height: 20,
									border: '2px solid #7494ea',
									borderTop: 'none',
								}}
							/>
							<a style={{ display: 'block', textAlign: 'center' }}>{title}</a>
						</div>
					)
				})}
			</div>
		)
	}
}

SummaryContainer.defaultProps = { summaries: [] }
