import { useCallback } from 'react';

const useSubmit = ({
	form: { values },
	onSubmit,
}) => (
	useCallback((event) => {
		if (event)
			event.preventDefault();

		onSubmit && onSubmit(values);
	}, [values])
);

export default useSubmit;
