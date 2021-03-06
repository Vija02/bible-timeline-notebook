import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ChapterOfTheDay from './ChapterOfTheDay'
import styles from './index.module.css'

export default class AboutIndex extends Component {
	render() {
		return (
			<>
				<div id="cotd" className={styles.cotdContainer}>
					<ChapterOfTheDay />
				</div>
				<div className="bodyContainer">
					<div id="resources" className="padContainer">
						<h2 className="cardTitle">Resources</h2>
						<p className={styles.text}>
							If you haven't already done so, it is strongly recommended that you finish reading the bible
							at least once. This allows you to understand the bigger picture of the bible. There are{' '}
							<i>a lot</i> of excellent reading plans readily available on the internet. Pick any of them
							and stick to it. It gets easier over time!
							<br />
							<br />
							Here are some links to get you started:
						</p>

						<ResourcesRow
							title="YouVersion/Bible.com"
							content="A collection of reading plans from various sources, some which are also listed below."
							link="https://www.bible.com/reading-plans-collection/1921-whole"
						/>

						<ResourcesRow
							title="BibleGateway"
							content="Another collection of reading plans with a more standard approach."
							link="https://www.biblegateway.com/reading-plans/"
						/>

						<ResourcesRow
							title="The Bible Project"
							content="A 1-year reading plan accompanied by great animated video explanations."
							link="https://thebibleproject.com/other-resources/other/"
						/>
						<p className={styles.muchMoreText}>
							And much more!{' '}
							<Link className={styles.link} to="/contact-me">
								Contact me
							</Link>{' '}
							if you want to suggest a website to be listed here.
						</p>
					</div>
					<div className="padContainer">
						<h2 className="cardTitle">Using this website</h2>
						<p className={styles.text}>
							If you are here, you probably want to know the bible better.
							<br />
							<br />
							First,{' '}
							<a href="#resources" className={styles.link}>
								read the whole bible!
							</a>{' '}
							Look at the resources above if you haven't. <br />
							Once you're done with that, there are always other reading plans to follow. If one catches
							your attention, great! If not, that's fine too.
							<br />
							<br />
							You might be more familiar with "verse of the day". The reason why we focus on a single{' '}
							<b>chapter</b> is to allow readers to extract information that matters to them. If there are
							any specific topic that resonates with you, we encourage that you take some time to research
							more into the book.{' '}
							<a href="#cotd" className={styles.link}>
								Look at the today's <i>Chapter of the Day</i>
							</a>
						</p>
					</div>
					{/* <div className="cardContainer">Previous chapter of the day</div> */}
				</div>
			</>
		)
	}
}

class ResourcesRow extends Component {
	render() {
		const { title, content, link } = this.props

		return (
			<a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
				<div className="cardContainer">
					<h4 className={styles.resourcesTitle}>
						<span className={styles.resourcesTitle}>{title}</span>
					</h4>
					<p className={styles.resourcesContent}>{content}</p>
					<span className={styles.resourcesLink}>Go to site</span>
				</div>
			</a>
		)
	}
}
