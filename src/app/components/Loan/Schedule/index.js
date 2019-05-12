import React from 'react';
import './styles.scss';
import Row from './Row';
import { pmt } from '../../../utils/loan';

const roundHundredth = (num) => Math.round(num * 100) / 100;

const getRow = ({
	balance,
	month,
	interestRate,
	loanLengthMonths,
	monthlyPayment
}) => {
	const interestPayment = roundHundredth(balance * interestRate / 1200);
	let principalPayment = roundHundredth(monthlyPayment - interestPayment);
	let extraPayment = 0;
	let closingBalance = roundHundredth(balance - principalPayment - extraPayment);
	if (loanLengthMonths === month && closingBalance > 0) {
		extraPayment = roundHundredth(extraPayment + closingBalance);
		closingBalance = 0;
	}
	if (closingBalance < 0) {
		principalPayment = roundHundredth(principalPayment - closingBalance);
		closingBalance = 0;
	}

	const totalPayment = roundHundredth(interestPayment + principalPayment + extraPayment);




	return {
		openingBalance: balance,
		month,
		interestPayment,
		principalPayment,
		extraPayment,
		closingBalance,
		totalPayment
	};
};

const getRows = ({
	loanAmount,
	loanLengthMonths,
	interestRate,
	monthlyPayment,
}) => {
	let balance = loanAmount;
	const rows = [];
	let month = 0;

	while (balance > 0) {
		month += 1;
		const row = getRow({
			month,
			loanLengthMonths,
			balance,
			interestRate,
			monthlyPayment
		});
		balance = row.closingBalance;
		rows.push(row);
	}

	return rows;
};

const Schedule = ({
	loanInfo = {}
}) => {
	const {
		loanAmount,
		interestRate,
		loanLengthMonths,
	} = loanInfo;
	const monthlyPayment = roundHundredth(pmt(interestRate / 1200, loanLengthMonths, -loanAmount));

	const rows = getRows({
		loanAmount: parseInt(loanAmount, 10),
		loanLengthMonths,
		interestRate,
		monthlyPayment
	});

	return (
		<table className='schedule'>
			<thead>
				<tr>
					<th>Month</th>
					<th>Opening<br />Balance</th>
					<th>Interest</th>
					<th>Principal</th>
					<th>Extra<br />Payment</th>
					<th>Closing<br />Balance</th>
					<th>Total<br />Payment</th>
				</tr>
			</thead>
			<tbody>
				{rows.map(Row)}
			</tbody>
		</table>
	);
};

export default React.memo(Schedule);
