import useFormChildren from './useFormChildren';
import useSetInitialFormData from './useSetInitialFormData';
import useSubmit from './useSubmit';

/**
 * @param children
 * @param fieldDefaults
 * @param setFormData
 * @param onFormChange
 * @param onSubmit
 * @param formData
 * @returns {{handleSubmit: *, formChildren: *}}
 */
const useForm = ({
	children,
	fieldDefaults,
	setFormData,
	onChange: onFormChange,
	onDirtyChange,
	onValidChange,
	onSubmit,
	formData,
}) => {
	useSetInitialFormData({
		children,
		setFormData
	});

	const handleSubmit = useSubmit({
		formData,
		onSubmit,
	});

	const formChildren = useFormChildren({
		children,
		fieldDefaults,
		formData,
		setFormData,
		onDirtyChange,
		onFormChange,
		onValidChange,
	});

	return {
		formChildren,
		handleSubmit
	};
};

export default useForm;