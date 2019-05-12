import React, { useCallback, useEffect, useMemo } from 'react';

const noop = () => {};

const mapChildToFormChildFactory = ({
	fieldDefaults,
	handleChange,
}) => (child) => (
	React.cloneElement(child, {
		onUpdate: handleChange,
		...fieldDefaults
	})
);

const hookForm = ({
	children,
	fieldDefaults,
	setFormData,
	onChange = noop,
	onSubmit = noop,
	formData,
}) => {
	const handleSubmit = useCallback((event) => {
		if (event) event.preventDefault();
		onSubmit(formData);
	}, [formData]);

	const handleChange = useCallback((name, value) => {
		const newValues = { ...formData, [name]: value };
		setFormData(newValues);
		onChange(newValues);
	}, [formData]);

	const formChildren = useMemo(() => (
		React.Children.map(children, mapChildToFormChildFactory({
			fieldDefaults,
			handleChange,
		}))
	), [formData]);

	useEffect(() => {
		const defaultValues = React.Children
			.toArray(children)
			.reduce((accum, { props }) => ({
				...accum,
				[props.name]: props.defaultValue
			}), {});

		setFormData(defaultValues);
	}, []);

	return { formChildren, handleSubmit };
};

/*
	Form Component
 */
const Form = ({
	ref,
	className,
	children,
	fieldDefaults,
	setFormData,
	formData,
	onChange,
	onSubmit,
}) => {
	const { formChildren, handleSubmit } = hookForm({
		children,
		fieldDefaults,
		setFormData,
		onChange,
		onSubmit,
		formData,
	});

	return <form
		ref={ref}
		className={className}
		onSubmit={handleSubmit}
	>
		{formChildren}
	</form>;
};

export default React.memo(Form);
