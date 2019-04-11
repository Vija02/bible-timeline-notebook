import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import LoginModal from './LoginModal'

export default props => {
	const [opened, setOpened] = useState(false)

	const toggleModal = () => setOpened(!opened)

	return (
		<>
			<div onClick={toggleModal}>{props.children}</div>
			{opened
				? ReactDOM.createPortal(
						<LoginModal onBackdropClicked={toggleModal} />,
						document.getElementById('modal-root'),
				  )
				: null}
		</>
	)
}
