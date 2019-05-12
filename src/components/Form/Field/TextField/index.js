import React from 'react';
import useInputField from '../hooks/useInputField';
import '../styles.scss';

const TextField = ({
	type,
	label,
	name,
	onUpdate,
	defaultValue = '',
	required,
}) => {
	const {
		onBlur,
		onChange,
		value
	} = useInputField({
		defaultValue,
		name,
		onUpdate
	});

	return (
		<div className="adx-field">
			<label className="adx-label">{label}</label>
			<div className="adx-control">
				<input
					className="adx-input"
					type={type}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					value={value}
					required={required}
				/>
			</div>
		</div>
	);
};

export default React.memo(TextField);