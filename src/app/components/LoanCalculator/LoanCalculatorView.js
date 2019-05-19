import React from 'react';
import DetailsForm from './DetailsForm';
import Schedule from './Schedule';

const LoanCalculatorView = ({
	detailsForm,
}) => {
	const { changes, dirty, values } = detailsForm;
	const dirtyClass = dirty ? 'dirty' : 'not-dirty';

	return (
		<>
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

export default React.memo(LoanCalculatorView);
