import { useState, useCallback, useEffect } from 'react';

const useBufferedOnInputChange = ({
	onChange,
	onChangeBuffer,
	setValue,
	value,
}) => {
	const [bufferedHandler, setBufferedHandler] = useState(null);
	const [isValueAndBufferedValueInSync, setIsValueAndBufferedValueInSync] = useState(true);

	const onInputChange = useCallback(({ target }) => {
		const { value } = target;
		setValue(value);
		setIsValueAndBufferedValueInSync(false);

		clearTimeout(bufferedHandler);

		setBufferedHandler(setTimeout(() => {
			onChange(value);
			setIsValueAndBufferedValueInSync(true);
			clearTimeout(bufferedHandler);
		}, onChangeBuffer));
	}, [
		isValueAndBufferedValueInSync,
		value,
		onChange
	]);

	useEffect(() => () => clearTimeout(bufferedHandler), [bufferedHandler]);

	return {
		bufferedHandler,
		onInputChange,
		isValueAndBufferedValueInSync,
	};
};

const useOnBlur = ({
	bufferedHandler,
	isValueAndBufferedValueInSync,
	onChange,
	value,
}) => (
	useCallback(() => {
		if (!isValueAndBufferedValueInSync) {
			clearTimeout(bufferedHandler);
			onChange(value);
		}
	}, [
		bufferedHandler,
		isValueAndBufferedValueInSync,
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

	const {
		bufferedHandler,
		onInputChange,
		isValueAndBufferedValueInSync,
	} = useBufferedOnInputChange({
		onChange,
		onChangeBuffer,
		setValue,
		value,
	});

	const onBlur = useOnBlur({
		bufferedHandler,
		onChange,
		value,
		isValueAndBufferedValueInSync,
	});

	return {
		value,
		onBlur,
		onInputChange,
	};
};

export default useInputValue;
