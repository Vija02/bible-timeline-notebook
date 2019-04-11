import React from 'react'
import ReactDOM from 'react-dom'
import Raven from 'raven-js'
import './index.css'
import './sharedStyles/index.css'
import 'react-toastify/dist/ReactToastify.css'
import Root from 'containers/Root'

import { AuthProvider } from 'providers/Auth'

// import registerServiceWorker from './registerServiceWorker'

import { version } from '../package.json'

import sizeMe from 'react-sizeme'
sizeMe.noPlaceholders = true

if (process.env.REACT_APP_SENTRY_DSN && process.env.NODE_ENV === 'production') {
	Raven.config(process.env.REACT_APP_SENTRY_DSN, {
		release: version,
	}).install()
}

ReactDOM.render(
	<AuthProvider>
		<Root />
	</AuthProvider>,
	document.getElementById('root'),
)
// registerServiceWorker()
