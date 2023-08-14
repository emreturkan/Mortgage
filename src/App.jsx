import React, {useState} from 'react'

const App = () => {
	const [loanAmount, setLoanAmount] = useState(0)
	const [annualInterestRate, setAnnualInterestRate] = useState(0)
	const [loanTerm, setLoanTerm] = useState(0)
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [monthlyPayment, setMonthlyPayment] = useState(null)

	const submitCalculation = () => {
		if (!loanAmount || !annualInterestRate || !loanTerm) {
			if (!loanAmount) {
				setErrorMessage('* Please enter the loan amount')
			} else if (loanAmount <= 0) {
				setErrorMessage('* Loan amount must be greater than 0')
			} else if (!annualInterestRate) {
				setErrorMessage('* Please enter the annual interest rate')
			} else if (annualInterestRate <= 0 || annualInterestRate >= 90) {
				setErrorMessage(
					'* Annual interest rate must be greater than 0 and less than 90'
				)
			} else if (!loanTerm) {
				setErrorMessage('* Please select the loan term')
			}
			setError(true)

			setTimeout(() => {
				setError(false)
			}, 3000)
		}

		const arp = annualInterestRate / 100
		const monthsTerm = loanTerm * 12
		const monthlyInterestRate = arp / 12

		const monthlyPayment =
			(loanAmount *
				monthlyInterestRate *
				Math.pow(1 + monthlyInterestRate, monthsTerm)) /
			(Math.pow(1 + monthlyInterestRate, monthsTerm) - 1)

		if (
			!isNaN(monthlyPayment) &&
			loanAmount > 0 &&
			annualInterestRate > 0 &&
			annualInterestRate <= 90 &&
			loanTerm > 0
		) {
			setMonthlyPayment(monthlyPayment.toFixed(2).replace('.', ','))
		} else {
			setMonthlyPayment(null)
		}
	}

	return (
		<div className="bg-gradient-to-r from-indigo-300 to-blue-400 h-screen w-full">
			<div className="flex flex-col w-full h-full justify-center items-center ">
				<h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-20 text-center">
					Mortgage Monthly Payment Calculator
				</h2>
				<div className="flex flex-col  md:flex-row justify-center items-center gap-x-8">
					<div className="main_form">
						<div>
							<label htmlFor="loan_amount" className="label ">
								Loan Amount ($)
							</label>
						</div>
						<div className="w-72 md:w-3/3">
							<input
								type="number"
								onChange={(e) => setLoanAmount(e.target.value)}
								id="loan_amount"
								className="inputs"
								placeholder="Loan Amount"
								required
							/>
						</div>
					</div>
					<div className="main_form">
						<div>
							<label htmlFor="annual_interest_rate" className="label ">
								Annual interest rate (%)
							</label>
						</div>
						<div className="w-72 md:w-3/3">
							<input
								type="number"
								onChange={(e) => setAnnualInterestRate(e.target.value)}
								id="annual_interest_rate"
								className="inputs "
								placeholder="Annual interest rate"
								required
							/>
						</div>
					</div>
					<div className="main_form">
						<div>
							<label htmlFor="loan_term" className="label ">
								Loan term (years)
							</label>
						</div>
						<div className="w-72 md:w-3/3">
							<select
								id="loan_term"
								defaultValue={loanTerm}
								onChange={(e) => setLoanTerm(e.target.value)}
								className="inputs"
							>
								<option defaultValue={1}>Select Loan Term</option>

								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
							</select>
						</div>
					</div>
				</div>
				{error && (
					<div className="text-red-500 font-base text-sm bg-gray-50 px-6 py-2 rounded-lg shadow-md mb-5">
						{errorMessage}
					</div>
				)}

				<div className="mb-6">
					<button onClick={submitCalculation} type="button" className="button">
						Calculate
					</button>
				</div>
				{monthlyPayment && (
					<div className="bg-gray-800  text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-x-3">
						<img className="w-6 h-6" src="/images/house.svg" alt="house" />
						Monthly mortgage payment:
						<span className="font-bold flex items-center text-lg">
							${parseFloat(monthlyPayment).toLocaleString('en-US')}
						</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default App
