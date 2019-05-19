import { useState, useCallback, useEffect } from 'react';

const useBufferedOnInputChange = ({
	onChange,
	onChangeBuffer,
	setValue,
	value,
}) => {
	const [bufferedHandler, setBufferedHandler] = useState(null);

	const onInputChange = useCallback(({ target }) => {
		const { value } = target;
		setValue(value);

		clearTimeout(bufferedHandler);

		setBufferedHandler(setTimeout(() => {
			onChange(value);
			clearTimeout(bufferedHandler);
		}, onChangeBuffer));
	}, [
		value,
		onChange
	]);

	useEffect(() => () => clearTimeout(bufferedHandler), [bufferedHandler]);

	return onInputChange;
};

const useOnBlur = ({
	onChange,
	value,
}) => (
	useCallback(() => {
		onChange(value);
	}, [
		value,
		onChange
	])
);

/**
 * useInputValue
 *
 * @param initialValue
 * @param onChangeBuffer
 * @param onChange
 * @returns {{onBlur: Function, onInputChange: Function, value: any}}
 */
const useInputValue = ({
	initialValue,
	onChangeBuffer,
	onChange,
}) => {
	const [value, setValue] = useState(initialValue);

	const onInputChange = useBufferedOnInputChange({
		onChange,
		onChangeBuffer,
		setValue,
		value,
	});

	const onBlur = useOnBlur({
		onChange,
		value,
	});

	return {
		value,
		onBlur,
		onInputChange
	};
};

export default useInputValue;
