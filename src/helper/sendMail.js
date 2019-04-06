import axios from 'axios'

export default data => {
	const formattedData = {
		...data,
		SecureToken: '6d2d5254-7b9d-4f89-94e3-463423e3b8cf',
		To: 'salim.michaelmi+overrise@gmail.com',
		From: 'overrisemailer@gmail.com',
		// Etc
		nocache: Math.floor(1e6 * Math.random() + 1),
		Action: 'Send',
	}

	return axios
		.post('https://smtpjs.com/v3/smtpjs.aspx?', formattedData, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		.then(res => {
			if (res.data !== 'OK') {
				throw new Error(res.data)
			}
		})
}
