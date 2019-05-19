import { useState, useEffect } from 'react';

const useSetValid = ({
	setValid,
	validator,
	value,
}) => (
	useEffect(() => {
		setValid(!validator || validator(value));
	}, [
		value
	])
);

const useOnValidChange = ({
	valid,
	onValidChange,
}) => (
	useEffect(() => {
		if (onValidChange)
			onValidChange(valid);

	}, [
		valid
	])
);

/**
 * useValid
 *
 * @param validator
 * @param value
 * @param onValidChange
 * @returns {boolean}
 */
const useValid = ({
	validator,
	value,
	onValidChange,
}) => {
	const [valid, setValid] = useState(true);

	useSetValid({
		setValid,
		validator,
		value,
	});

	useOnValidChange({
		valid,
		onValidChange
	});

	return valid;
};

export default useValid;
