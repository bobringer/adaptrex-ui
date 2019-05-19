import React, { useMemo } from 'react';
import LoanCalculatorView from './LoanCalculatorView';
import useForm from '../../../components/Form/hooks/useForm';

const LoanCalculator = () => {
	const detailsForm = useForm();
	const { changes, dirty, values } = detailsForm;

	return useMemo(() => (
		<LoanCalculatorView detailsForm={detailsForm} />
	), [
		changes,
		dirty,
		values,
	]);
};

export default LoanCalculator;
