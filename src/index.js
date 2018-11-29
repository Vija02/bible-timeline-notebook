import React from 'react'
import ReactDOM from 'react-dom'
import Raven from 'raven-js'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-tabs/style/react-tabs.css'
import Root from 'containers/Root'
// import registerServiceWorker from './registerServiceWorker'

import { version } from '../package.json'

import sizeMe from 'react-sizeme'
sizeMe.noPlaceholders = true

if (process.env.REACT_APP_SENTRY_DSN && process.env.NODE_ENV === 'production') {
	Raven.config(process.env.REACT_APP_SENTRY_DSN, {
		release: version,
	}).install()
}

ReactDOM.render(<Root />, document.getElementById('root'))
// registerServiceWorker()
