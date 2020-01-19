import React, { useEffect } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import AbsoluteAnimatedSwitch from 'components/AbsoluteAnimatedSwitch'
import getApolloClient from 'getApolloClient'
import { useAuth } from 'providers/Auth'
import { booksRegex } from 'helper'

import Navbar from './Navbar'
import Footer from './Footer'
import Home from './Home'
import ContactMe from './ContactMe'
import ChapterDetail from './ChapterDetail'
import ChapterInfo from './ChapterInfo'
import Notes from './Notes'

export default () => {
	const { jwt } = useAuth()

	return (
		<ApolloProvider
			client={getApolloClient(() => {
				console.log('Logout due to expiry')
				if (jwt !== null) {
					toast.warn('You have been logged out. Current login session expired.')
				}
				this.onLogout()
			}, jwt)}
		>
			<Router>
				<ScrollToTop>
					<Navbar />
					<AbsoluteAnimatedSwitch className="flex">
						<Route exact path="/contact-me" component={ContactMe} />
						<Route exact path={`/:bookName(${booksRegex})/:chapter`} component={ChapterDetail} />
						<Route exact path={`/:bookName(${booksRegex})`} component={ChapterInfo} />
						<Route exact path="/" component={Home} />
						{/* Only allow past here if logged in */}
						{!jwt ? <Redirect to="/" /> : null}
						<Route exact path="/notes" component={Notes} />
						<Redirect to="/" />
					</AbsoluteAnimatedSwitch>
					<Footer />
					<div id="modal-root" />
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnVisibilityChange
						draggable
						pauseOnHover
					/>
				</ScrollToTop>
			</Router>
		</ApolloProvider>
	)
}

const ScrollToTop = withRouter(props => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [props.location.pathname])

	return props.children
})
