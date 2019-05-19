import React from 'react';
import useForm from './hooks/useForm';

/**
 *
 * @param ref
 * @param className
 * @param children
 * @param fieldDefaults
 * @param setFormData
 * @param formData
 * @param onChange
 * @param onSubmit
 * @returns {*}
 * @constructor
 */
const Form = ({
	ref,
	className,
	children,
	fieldDefaults,
	setFormData,
	formData,
	onChange,
	onDirtyChange,
	onValidChange,
	onSubmit,
}) => {
	const {
		formChildren,
		handleSubmit
	} = useForm({
		children,
		fieldDefaults,
		setFormData,
		onChange,
		onDirtyChange,
		onValidChange,
		onSubmit,
		formData,
	});

	return (
		<form
			ref={ref}
			className={className}
			onSubmit={handleSubmit}
		>
			{formChildren}
		</form>
	);
};

export default React.memo(Form);
