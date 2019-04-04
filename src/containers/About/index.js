import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'containers/Navbar'

import ChapterOfTheDay from './ChapterOfTheDay'
import styles from './index.module.css'

export default class AboutIndex extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<div className={styles.bodyContainer}>
					<ChapterOfTheDay />
					<div className={styles.cardContainer}>
						<h2 className={styles.cardTitle}>Resources</h2>
						<p className={styles.text}>
							If you haven't, it is strongly recommended that you finish reading the bible at least once.
							This allows you to understand the bigger picture of the bible. There are <i>a lot</i> of
							excellent reading plans readily available on the internet. Pick any of them and stick to it.
							It gets easier over time!
							<br />
							<br />
							Here are some to get you started:
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
					<div className={styles.cardContainer}>
						<h2 className={styles.cardTitle}>Using this website</h2>
						<p className={styles.text}>
							If you are here, you probably want to know the bible better. First, read the whole bible!
							Look at the resources above if you haven't. <br />
							Once you're done with that, there are always other reading plans to follow. If one catches
							your attention, great! If not, that's fine too.
							<br />
							<br />
							You might be more familiar with "verse of the day". The reason why we focus on a single{' '}
							<b>chapter</b> is to allow readers to extract information that matters to them. If there are
							any specific topic that resonates with you, we encourage that you take some time to research
							more into the book.
						</p>
					</div>
					{/* <div className={styles.cardContainer}>Previous chapter of the day</div> */}
				</div>
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
								Contact Me
							</Link>
						</p>
						<p>
							<a className={styles.footerLink} href="https://github.com/overriseapp/overrise-web">
								Github
							</a>
						</p>
					</div>
					<span className={styles.footerCopyright}>©{new Date().getFullYear()} OverRise</span>
				</div>
			</div>
		)
	}
}

class ResourcesRow extends Component {
	render() {
		const { title, content, link } = this.props

		return (
			<div>
				<h4 className={styles.resourcesTitle}>
					<a className={styles.resourcesTitle} href={link}>
						{title}
					</a>
				</h4>
				<p className={styles.resourcesContent}>{content}</p>
				<a className={styles.resourcesLink} href={link}>
					Link to site
				</a>
			</div>
		)
	}
}
