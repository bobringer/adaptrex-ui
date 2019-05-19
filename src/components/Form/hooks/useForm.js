import { useState } from 'react';

const useForm = () => {
	const [initialValues, setInitialValues] = useState({});
	const [values, setValues] = useState({});
	const [dirty, setDirty] = useState(false);
	const [changes, setChanges] = useState({});
	const [invalid, setInvalid] = useState(false);
	const [invalidValues, setInvalidValues] = useState({});

	return {
		values,
		dirty,
		changes,
		initialValues,
		invalid,
		invalidValues,
		setValues,
		setDirty,
		setChanges,
		setInitialValues,
		setInvalid,
		setInvalidValues
	};
};

export default useForm;
