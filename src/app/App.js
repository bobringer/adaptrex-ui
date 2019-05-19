import React from 'react';
import DetailsForm from './components/Loan/DetailsForm';
import Schedule from './components/Loan/Schedule';
import './sass/base.scss';
import './styles.scss';
import useForm from '../components/Form/hooks/useForm';

const App = () => {
	const detailsForm = useForm();

	const { changes, dirty, values } = detailsForm;

	const dirtyClass = dirty ? 'dirty' : 'not-dirty';

	return (
		<>
			<div className='header'>
				Adaptrex Loan Calculator
			</div>
			<div className='top'>
				<DetailsForm form={detailsForm} />
				<div className='dirty-status'>
					<h3>
						Form is <span className={dirtyClass}>{dirty ? 'DIRTY' : 'NOT DIRTY'}</span>
					</h3>
					<pre>
						{JSON.stringify(changes, null, 2)};
					</pre>
				</div>
			</div>
			<div className='body'>
				<Schedule loanInfo={values} />
			</div>
		</>
	);
};

export default App;
