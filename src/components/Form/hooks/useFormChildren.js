import React, { useCallback, useMemo } from 'react';

/**
 * handleChangeFactory creates an onChange handler that is
 * applied to each field on the form.
 *
 * @param formData
 * @param setFormData
 * @param onFormChange
 * @returns {function({name: *, onChange?: *}): Function}
 */
const useHandleFieldChangeFactory = ({
	formData,
	setFormData,
	onFormChange
}) => (
	useCallback(({
		name,
		onChange: onFieldChange,
	}) => (value) => {
		const newFormData = { ...formData, [name]: value };
		setFormData(newFormData);
		if (onFieldChange)
			onFieldChange(value);
		if (onFormChange)
			onFormChange(newFormData);
	}, [
		formData,
		onFormChange
	])
);

const useHandleDirtyChangeFactory = ({
	onFormDirtyChange
}) => (
	useCallback(({
		onDirtyChange: onFieldDirtyChange
	}) => (dirty) => {
		if (onFieldDirtyChange)
			onFieldDirtyChange(dirty);
		if (onFormDirtyChange)
			// TODO: Do real form dirty stuff here!
			onFormDirtyChange(dirty);

	}, [
		onFormDirtyChange
	])
);

const useHandleValidChangeFactory = ({
	onFormValidChange
}) => (
	useCallback(({
		onValidChange: onFieldValidChange
	}) => (valid) => {
		if (onFieldValidChange)
			onFieldValidChange(valid);
		// TODO: Do form dirty stuff here!
		if (onFormValidChange)
			onFormValidChange(valid);
	}, [
		onFormValidChange
	])
);

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
	formData,
	setFormData,
	onDirtyChange,
	onFormChange,
	onValidChange,
}) => {
	const handleFieldChangeFactory = useHandleFieldChangeFactory({
		formData,
		setFormData,
		onFormChange
	});

	const handleDirtyChangeFactory = useHandleDirtyChangeFactory({
		onFormDirtyChange: onDirtyChange
	});

	const handleValidChangeFactory = useHandleValidChangeFactory({
		onFormValidChange: onValidChange
	});

	return useMemo(() => (
		React.Children
			.toArray(children)
			.map((child) => (
				React.cloneElement(child, {
					onChange: handleFieldChangeFactory(child.props),
					onDirtyChange: handleDirtyChangeFactory(child.props),
					onValidChange: handleValidChangeFactory(child.props),
					...fieldDefaults
				})
			))
	), [
		children,
		formData
	]);
};

export default useFormChildren;
