import React from 'react';
import Form from '../../../../components/Form';
import TextField from '../../../../components/Form/field/TextField';
import align from '../../../../constants/align';

const fieldDefaults = {
	labelAlign: align.LEFT,
	buffer: 400,
};

const DetailsFormView = ({ form }) => (
	<Form
		className='details-form'
		form={form}
		fieldDefaults={fieldDefaults}
		// onChange={(data) => console.log(data)}
	>
		<TextField
			label="Loan Start Date"
			name="startDate"
			// onChange={(value) => console.log(value)}
		/>
		<TextField
			value="500000"
			label="Loan Amount"
			name="loanAmount"
			validator={(value) => value > 100}
			// onDirtyChange={(dirty) => alert(dirty)}
		/>
		<TextField
			value="5"
			label="Rate"
			name="interestRate"
		/>
		<TextField
			value="360"
			label="Length"
			name="loanLengthMonths"
		/>
	</Form>
);

export default DetailsFormView;
