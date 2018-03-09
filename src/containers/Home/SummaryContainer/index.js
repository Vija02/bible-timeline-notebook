import React, { Component } from 'react'

import styles from './SummaryContainer.module.css'

const borderSideHeight = 20

export default class SummaryContainer extends Component {
	render() {
		return (
			<div className={styles.scrollerSummaryContainer}>
				{this.props.summaries.map((summary, i) => {
					const { offset, width, title } = summary
					return (
						<React.Fragment>
							<div
								style={{ width: offset * 2 + width, gridRow: `${i + 1} / span 1`, gridColumn: '1/2' }}
								key={`summary_${i}`}
							>
								<div
									style={{
										marginLeft: offset,
										width: width,
										height: borderSideHeight,
										border: '2px solid #7494ea',
										borderTop: 'none',
									}}
								/>
								<a style={{ display: 'block', textAlign: 'center' }}>{title}</a>
							</div>
							{i > 0 ? (
								<div
									style={{
										gridRow: `1/${i + 1}`,
										gridColumn: `1/2`,
										marginLeft: offset,
										width: width,
										height: '100%',
										borderRight: '2px dotted #7494ea',
										borderLeft: '2px dotted #7494ea',
									}}
								/>
							) : null}
						</React.Fragment>
					)
				})}
			</div>
		)
	}
}

SummaryContainer.defaultProps = { summaries: [] }
