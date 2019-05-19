import React from 'react';
import './sass/base.scss';
import './styles.scss';
import LoanCalculator from './components/LoanCalculator';

const App = () => (
	<>
		<div className='header'>
			Adaptrex Loan Calculator
		</div>
		<LoanCalculator />
	</>
);

export default App;
