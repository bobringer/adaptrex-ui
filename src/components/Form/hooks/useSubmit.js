import { useCallback } from 'react';

const useSubmit = ({
	formData,
	onSubmit,
}) => (
	useCallback((event) => {
		if (event)
			event.preventDefault();

		onSubmit && onSubmit(formData);
	}, [formData])
);

export default useSubmit;
