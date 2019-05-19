import React from 'react';
import Label from '../../Label';
import './styles.scss';

const Field = ({
	children,
	label,
}) => (
	<div className="adx-form-field">
		<Label>{label}</Label>
		<div className="adx-form-field-control">
			{children}
		</div>
	</div>
);

export default Field;