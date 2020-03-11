import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { getUserIdFromJWT } from 'helper'

const AuthContext = React.createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthConsumer = AuthContext.Consumer

export const AuthProvider = props => {
	const [jwt, setJwt] = useState(() => localStorage.getItem(process.env.REACT_APP_JWT_KEY_NAME))

	// Update our JWT to local storage
	// Before this, we need to make sure our local JWT is the correct one
	useEffect(() => {
		if (jwt) {
			localStorage.setItem(process.env.REACT_APP_JWT_KEY_NAME, jwt)
		} else {
			localStorage.removeItem(process.env.REACT_APP_JWT_KEY_NAME)
		}
	}, [jwt])

	const onLogin = newJwt => {
		setJwt(newJwt)
		toast.success(
			<p>
				<i className="far fa-check-circle" /> You are now logged in!
			</p>,
		)
	}

	const onLogout = (showMessage = false) => {
		setJwt(null)
		if (showMessage) {
			toast.info(
				<p>
					<i className="fas fa-exclamation-circle" /> You have successfully logged out.
				</p>,
			)
		}
	}

	return (
		<AuthContext.Provider value={{ onLogin, onLogout, jwt, userId: getUserIdFromJWT(jwt) }}>
			{props.children}
		</AuthContext.Provider>
	)
}
