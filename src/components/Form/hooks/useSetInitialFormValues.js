import React, { useEffect } from 'react';

const useSetInitialFormValues = ({
	children,
	form,
}) => {
	useEffect(() => {
		const defaultValues = React.Children
			.toArray(children)
			.reduce((accum, { props }) => ({
				...accum,
				[props.name]: props.value
			}), {});

		form.setValues(defaultValues);
		form.setInitialValues(defaultValues);
	}, []);
};

export default useSetInitialFormValues;
