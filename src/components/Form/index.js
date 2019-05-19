import React from 'react';
import useSubmit from './hooks/useSubmit';
import useSetInitialFormValues from './hooks/useSetInitialFormValues';
import useFormChildren from './hooks/useFormChildren';

/**
 *
 * @param form
 * @param className
 * @param children
 * @param fieldDefaults
 * @param onChange
 * @param onDirtyChange
 * @param onValidChange
 * @param onSubmit
 * @returns {*}
 * @constructor
 */
const Form = ({
	form,
	className,
	children,
	fieldDefaults,
	onChange,
	onDirtyChange,
	onValidChange,
	onSubmit,
}) => {
	useSetInitialFormValues({
		children,
		form,
	});

	const handleSubmit = useSubmit({
		form,
		onSubmit
	});

	const formChildren = useFormChildren({
		children,
		fieldDefaults,
		form,
		onChange,
		onDirtyChange,
		onValidChange,
	});

	return (
		<form
			className={className}
			onSubmit={handleSubmit}
		>
			{formChildren}
		</form>
	);
};

export default React.memo(Form);
