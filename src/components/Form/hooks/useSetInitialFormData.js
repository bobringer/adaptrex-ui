import React, { useEffect } from 'react';

const useSetInitialFormData = ({
	children,
	setFormData,
}) => {
	useEffect(() => {
		const defaultValues = React.Children
			.toArray(children)
			.reduce((accum, { props }) => ({
				...accum,
				[props.name]: props.value
			}), {});

		setFormData(defaultValues);
	}, []);
};

export default useSetInitialFormData;
