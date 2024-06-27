import './App.css'
import React, { useState } from 'react'

const BACKEND_URL = 'http://localhost:8000'

function App() {
	const [phoneNumber, setPhoneNumber] = useState('')
	const [timeFrame, setTimeFrame] = useState('')
	const [checkResult, setCheckResult] = useState(null)
	const [retrieveResult, setRetrieveResult] = useState(null)
	const [checkActivity, setCheckActivity] = useState(false)
	const [retrieveActivity, setRetrieveActivity] = useState(false)

	const handleCheckSubmit = async (e) => {
		e.preventDefault()
		setCheckActivity(true)
		fetch(`${BACKEND_URL}/check/${phoneNumber}/${timeFrame}`)
			.then(response => response.json())
			.then(data => {
				setCheckResult(data.message)
				setCheckActivity(false)
			})
	}

	const handleRetrieveSubmit = async (e) => {
		e.preventDefault()
		setRetrieveActivity(true)
		fetch(`${BACKEND_URL}/retrieve_date/${phoneNumber}`)
			.then(response => response.json())
			.then(data => {
				setRetrieveResult(data.message)
				setRetrieveActivity(false)
			})
	}

	return (
		<div className="App">
			<div className="use_case">
				<label htmlFor="check-form">
					SIM Swap Check
				</label>
				<form onSubmit={handleCheckSubmit} name="check-form">
					<label htmlFor="phone_number">
						Mobile line
					</label>
					<input
						type="text"
						name="phone_number"
						placeholder="Phone number"
						pattern="^\+[0-9]{1,3}[0-9]{1,14}$"
						required
						value={phoneNumber}
						onChange={e => setPhoneNumber(e.target.value)}
					/>
					<label htmlFor="phone_number" className="footnote">
					Format: +[country code][phone number]
					</label>
					<label htmlFor="time_frame">
						Time frame
					</label>
					<input
						type="number"
						name="time_frame"
						placeholder="Hours"
						step="1"
						required
						value={timeFrame}
						onChange={e => setTimeFrame(e.target.value)}
					/>
					<button type="submit" disabled={checkActivity}>
						Check
					</button>
					{checkResult && !checkActivity &&
						<p className="result">
							{checkResult}
						</p>
					}
					{checkActivity &&
						<div className="spinner"></div>
					}
				</form>
			</div>

			<div className="use_case">
				<label htmlFor="retrieve-form">
					Retrieve SIM Swap date
				</label>
				<form onSubmit={handleRetrieveSubmit} name="retrieve-form">
					<label htmlFor="phone_number">
						Mobile line
					</label>
					<input
						type="text"
						name="phone_number"
						placeholder="Phone number"
						pattern="^\+[0-9]{1,3}[0-9]{1,14}$"
						required
						value={phoneNumber}
						onChange={e => setPhoneNumber(e.target.value)}
					/>
					<label htmlFor="phone_number" className="footnote">
					Format: +[country code][phone number]
					</label>
					<button type="submit" disabled={retrieveActivity}>
						Retrieve
					</button>
					{retrieveResult && !retrieveActivity &&
						<p className="result">
							{retrieveResult}
						</p>
					}
					{retrieveActivity &&
						<div className="spinner"></div>
					}
				</form>
			</div>
		</div>
	)
}

export default App
