import React from 'react';

const usCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const to$ = (number) => usCurrency.format(number);

const Row = ({
	openingBalance,
	month,
	interestPayment,
	principalPayment,
	extraPayment,
	closingBalance,
	totalPayment
}) => (
	<tr
		key={month}
	>
		<td>{month}</td>
		<td>{to$(openingBalance)}</td>
		<td>{to$(interestPayment)}</td>
		<td>{to$(principalPayment)}</td>
		<td>{to$(extraPayment)}</td>
		<td>{to$(closingBalance)}</td>
		<td>{to$(totalPayment)}</td>
	</tr>
);

export default Row;
