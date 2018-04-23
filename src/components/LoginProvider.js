import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LoginProvider extends Component {
	getChildContext() {
		return {
			onLogin: this.props.onLogin,
			onLogout: this.props.onLogout,
			jwt: this.props.jwt,
		}
	}
	render() {
		return React.Children.only(this.props.children)
	}
}

LoginProvider.childContextTypes = {
	onLogin: PropTypes.func,
	onLogout: PropTypes.func,
	jwt: PropTypes.string,
}

LoginProvider.propTypes = {
	onLogin: PropTypes.func,
	onLogout: PropTypes.func,
	jwt: PropTypes.string,
}
