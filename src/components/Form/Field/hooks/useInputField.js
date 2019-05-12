import { useState, useCallback } from 'react';
const useInputField = ({
	defaultValue,
	name,
	onUpdate,
}) => {
	const [value, setValue] = useState(defaultValue);

	const onBlur = useCallback(() => {
		onUpdate(name, value);
	}, [value, onUpdate]);

	const onChange = useCallback(({ target }) => {
		setValue(target.value);
	}, []);

	return {
		onBlur,
		onChange,
		value,
	};
};

export default useInputField;
