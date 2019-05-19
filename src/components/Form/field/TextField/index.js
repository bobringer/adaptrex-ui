import React, { useMemo } from 'react';
import useTextField from './useTextField';
import './styles.scss';
import Field from '../Field';

const useClassNames = ({
	valid,
	dirty
}) => (
	useMemo(() => {
		const classNameArray = ['adx-form-field-input'];
		if (!valid)
			classNameArray.push('adx-invalid');
		if (dirty)
			classNameArray.push('adx-dirty');
		return classNameArray.join(' ');
	}, [
		valid,
		dirty
	])
);

const TextField = ({
	onChangeBuffer,
	type,
	label,
	placeholder,
	readOnly,
	spellcheck,
	name,
	onChange,
	onDirtyChange,
	onValidChange,
	value: initialValue = '',
	validator,
	required,
}) => {
	const {
		dirty,
		onBlur,
		onInputChange,
		valid,
		value,
	} = useTextField({
		initialValue,
		onChange,
		onChangeBuffer,
		onDirtyChange,
		onValidChange,
		validator,
	});

	const classNames = useClassNames({
		dirty,
		valid
	});

	return (
		<Field label={label}>
			<input
				className={classNames}
				autoComplete="off"
				type={type}
				name={name}
				placeholder={placeholder}
				readOnly={readOnly}
				spellCheck={spellcheck}
				onBlur={onBlur}
				onChange={onInputChange}
				value={value}
				required={required}
			/>
		</Field>
	);
};

export default React.memo(TextField);