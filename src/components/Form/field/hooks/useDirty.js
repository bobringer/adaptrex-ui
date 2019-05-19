import { useState, useEffect } from 'react';

const useSetDirty = ({
	initialValue,
	setDirty,
	value
}) => (
	useEffect(() => {
		setDirty(value !== initialValue);
	}, [
		initialValue,
		value
	])
);

const useOnDirtyChange = ({
	dirty,
	onDirtyChange
}) => (
	useEffect(() => {
		if (onDirtyChange)
			onDirtyChange(dirty);
	}, [
		dirty
	])
);

/**
 * useDirty
 *
 * @param value
 * @param initialValue
 * @param onDirtyChange
 * @returns {boolean}
 */
const useDirty = ({
	value,
	initialValue,
	onDirtyChange,
}) => {
	const [dirty, setDirty] = useState(false);

	useSetDirty({
		initialValue,
		setDirty,
		value
	});

	useOnDirtyChange({
		dirty,
		onDirtyChange
	});

	return dirty;
};

export default useDirty;
