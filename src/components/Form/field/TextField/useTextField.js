import useInputValue from '../hooks/useInputValue';
import useDirty from '../hooks/useDirty';
import useValid from '../hooks/useValid';

/**
 * Hook that initializes state and callbacks for a TextField
 *
 * @returns {{dirty: boolean, valid: boolean, onBlur: Function, onInputChange: Function, value: any}}
 */
const useTextField = ({
	initialValue,
	onChange,
	onChangeBuffer = 400,
	onDirtyChange,
	onValidChange,
	validator,
}) => {
	const {
		value,
		onBlur,
		onInputChange,
	} = useInputValue({
		initialValue,
		onChangeBuffer,
		onChange,
	});

	const dirty = useDirty({
		value,
		initialValue,
		onDirtyChange,
	});

	const valid = useValid({
		onValidChange,
		value,
		validator,
	});

	return {
		dirty,
		onBlur,
		onInputChange,
		value,
		valid,
	};
};

export default useTextField;
