import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login'
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify'
import Raven from 'raven-js'

import Modal from 'components/Modal'

import styles from './LoginModal.module.css'

export default class LoginModal extends Component {
	onSuccess(response) {
    const tokenId = response.tokenId

		console.log(tokenId);
		console.log(response);
		
    

    toast.success(
			<p>
				<i className="far fa-check-circle" /> You are now logged in!
			</p>,
		)
    this.props.onBackdropClicked()
	}
	onFailure(response) {
		let errorMessage
		switch (response.error) {
			case 'idpiframe_initialization_failed':
				errorMessage = 'Failed to initialize Google Sign In API. Please try again later.'
        Raven.captureException(new Error(JSON.stringify(response)))
        this.props.onBackdropClicked()
				break
			case 'popup_closed_by_user':
				errorMessage = 'Login Failed. Popup closed'
				break
			case 'access_denied':
				errorMessage = 'Login Failed. Access denied'
				break
			case 'immediate_failed':
				errorMessage = ''
				break
			default:
        errorMessage = 'Error occured when trying to login'
        Raven.captureException(new Error(JSON.stringify(response)))
        this.props.onBackdropClicked()
		}
		console.error(response)
		toast.error(
			<p>
				<i className="fa fa-exclamation-triangle" /> {errorMessage}
			</p>,
		)
	}
	render() {
		return (
			<Modal
				onBackdropClicked={() => {
					this.props.onBackdropClicked()
				}}
			>
				<div className={styles.modalContainer}>
					<h3>Login</h3>
					<p>Only Google login currently available</p>
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
						buttonText="Login"
						onSuccess={this.onSuccess.bind(this)}
						onFailure={this.onFailure.bind(this)}
						render={renderProps => <GoogleButton {...renderProps} />}
					/>
				</div>
			</Modal>
		)
	}
}
