import React from 'react';
import Form from '../../../../components/Form';
import TextField from '../../../../components/Form/field/TextField';
import align from '../../../../constants/align';
import './styles.scss';

const fieldDefaults = {
	labelAlign: align.LEFT,
	buffer: 400,
};

const DetailsForm = ({ formData, setFormData }) => (
	<Form
		className='details-form'
		formData={formData}
		setFormData={setFormData}
		fieldDefaults={fieldDefaults}
		// onChange={(data) => console.log(data)}
	>
		<TextField
			label="Loan Start Date"
			name="startDate"
			// onChange={(value) => console.log(value)}
		/>
		<TextField
			value="388000"
			label="Loan Amount"
			name="loanAmount"
			validator={(value) => value > 100}
			// onDirtyChange={(dirty) => alert(dirty)}
		/>
		<TextField
			value="4.875"
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

export default React.memo(DetailsForm);
