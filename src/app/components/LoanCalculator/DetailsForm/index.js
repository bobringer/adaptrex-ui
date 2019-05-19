import React from 'react';
import './styles.scss';
import DetailsFormView from './DetailsFormView';

const DetailsForm = (params) => {
	return <DetailsFormView {...params} />;
};

export default React.memo(DetailsForm);
