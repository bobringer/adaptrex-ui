import React, { useCallback, useMemo } from 'react';

const calculateDirty = ({
	initialValues,
	newValues,
}) => {
	const changes = Object.entries(newValues)
		.reduce((changes, [name, value]) => {
			const initialValue = initialValues[name];
			const hasChange = initialValue !== value;
			if (!hasChange)
				return changes;

			return {
				...changes,
				[name]: {
					from: initialValue,
					to: value
				}
			};
		}, {});

	const dirty = Object.keys(changes).length > 0;

	return {
		changes,
		dirty,
	};
};

/**
 * handleChangeFactory creates an onChange handler that is
 * applied to each field on the form.
 *
 * TODO: This is complex, explain what's going on here
 * - The hook receives form level data and returns a memoized callback factory
 * - The callback factory receives field level data and returns the callback
 * - The callback now has access to both the form level and field level settings
 *
 * @param formData
 * @param setFormData
 * @param onFormChange
 * @returns {function({name: *, onChange?: *}): Function}
 */
const useHandleFieldChangeFactory = ({
	initialValues,
	values,
	setChanges,
	setDirty,
	setValues,
	onFormValuesChange
}) => (
	useCallback(({
		name,
		onChange: onFieldValueChange,
	}) => (value) => {
		const newValues = { ...values, [name]: value };
		setValues(newValues);

		const { changes, dirty } = calculateDirty({
			initialValues,
			newValues,
		});
		setChanges(changes);
		setDirty(dirty);

		if (onFieldValueChange)
			onFieldValueChange(value);
		if (onFormValuesChange)
			onFormValuesChange(newValues);
	}, [
		initialValues,
		values,
		onFormValuesChange
	])
);

// const useHandleDirtyChangeFactory = ({
// 	onFormDirtyChange
// }) => (
// 	useCallback(({
// 		onDirtyChange: onFieldDirtyChange
// 	}) => (dirty) => {
// 		if (onFieldDirtyChange)
// 			onFieldDirtyChange(dirty);
// 		if (onFormDirtyChange)
// 			// TODO: Do real form dirty stuff here!
// 			onFormDirtyChange(dirty);
// 	}, [
// 		onFormDirtyChange
// 	])
// );

// const useHandleValidChangeFactory = ({
// 	onFormValidChange
// }) => (
// 	useCallback(({
// 		onValidChange: onFieldValidChange
// 	}) => (valid) => {
// 		if (onFieldValidChange)
// 			onFieldValidChange(valid);
// 		// TODO: Do form dirty stuff here!
// 		if (onFormValidChange)
// 			onFormValidChange(valid);
// 	}, [
// 		onFormValidChange
// 	])
// );

/**
 * Recurse through all of the children on the form.  If they are
 * fields, apply fieldDefaults and add a custom change handler
 *
 * @param children
 * @param handleFieldChangeFactory
 * @param fieldDefaults
 * @param formData
 * @returns { * }
 */
const useFormChildren = ({
	children,
	fieldDefaults,
	form: {
		initialValues,
		values,
		setValues,
		setChanges,
		setDirty,
	},
	onChange: onFormValuesChange,
	onDirtyChange,
	onValidChange,
}) => {
	const handleFieldChangeFactory = useHandleFieldChangeFactory({
		initialValues,
		values,
		setChanges,
		setDirty,
		setValues,
		onFormValuesChange
	});

	// const handleDirtyChangeFactory = useHandleDirtyChangeFactory({
	// 	onFormDirtyChange: onDirtyChange
	// });

	// const handleValidChangeFactory = useHandleValidChangeFactory({
	// 	onFormValidChange: onValidChange
	// });

	return useMemo(() => (
		React.Children
			.toArray(children)
			.map((child) => (
				React.cloneElement(child, {
					onChange: handleFieldChangeFactory(child.props),
					// onDirtyChange: handleDirtyChangeFactory(child.props),
					// onValidChange: handleValidChangeFactory(child.props),
					...fieldDefaults
				})
			))
	), [
		children,
		values
	]);
};

export default useFormChildren;
