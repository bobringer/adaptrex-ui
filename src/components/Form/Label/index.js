import React from 'react';
import './style.scss';

const Label = ({
	children,
	htmlFor,
}) => (
	<label
		className='adx-label'
		htmlFor={htmlFor}
	>
		{children}
	</label>
);

export default Label;
