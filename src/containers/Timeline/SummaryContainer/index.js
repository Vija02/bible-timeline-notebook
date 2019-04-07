import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './SummaryContainer.module.css'

export default class SummaryContainer extends Component {
	render() {
		return (
			<div className={styles.scrollerSummaryContainer}>
				{this.props.summaries.map((summary, i) => {
					const { id, offset, width, title } = summary
					return (
						<React.Fragment key={`summary_${i}`}>
							<div style={{ width: offset * 2 + width, gridRow: `${i + 1} / span 1`, gridColumn: '1/2' }}>
								<div
									className={styles.mainGuideline}
									style={{
										marginLeft: offset,
										width,
									}}
								/>
								<div className={styles.titleContainer}>
									<Link to={`${this.props.match ? this.props.match.url : ""}/summary/${id}`} className={styles.title}>{title}</Link>
								</div>
							</div>
							{i > 0 ? (
								<div
									className={styles.secondaryGuideline}
									style={{
										gridRow: `1/${i + 1}`,
										marginLeft: offset,
										width,
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
