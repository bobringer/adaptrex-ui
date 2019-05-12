import React from 'react';
import Form from '../../../../components/Form';
import TextField from '../../../../components/Form/Field/TextField';
import align from '../../../../constants/align';
import './styles.scss';

const fieldDefaults = {
	labelAlign: align.LEFT
};

const DetailsForm = ({ formData, setFormData }) => (
	<Form
		className='details-form'
		formData={formData}
		setFormData={setFormData}
		fieldDefaults={fieldDefaults}
	>
		<TextField label="Loan Start Date" name="startDate" />
		<TextField defaultValue={388000} label="Loan Amount" name="loanAmount" />
		<TextField defaultValue={4.875} label="Rate" name="interestRate" />
		<TextField defaultValue={360} label="Length" name="loanLengthMonths" />
	</Form>
);

export default React.memo(DetailsForm);
