import React, { useState } from 'react';
import DetailsForm from './components/Loan/DetailsForm';
import Schedule from './components/Loan/Schedule';
import './sass/base.scss';
import './styles.scss';

const App = () => {
	const [ loanInfo, setLoanInfo ] = useState();

	return (
		<>
			<div className='header'>
				Adaptrex Loan Calculator
			</div>
			<div className='top'>
				<DetailsForm formData={loanInfo} setFormData={setLoanInfo} />
			</div>
			<div className='body'>
				<Schedule loanInfo={loanInfo} />
			</div>
		</>
	);
};

export default App;
