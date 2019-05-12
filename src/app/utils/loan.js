function pmt(interestRate, numberOfMonths, presentValue, futureValue = 0, type = 0) {
	/*
	 * interestRate   - interest rate per month
	 * numberOfMonths   - number of periods (months)
	 * presentValue   - present value
	 * futureValue   - future value
	 * type - when the payments are due:
	 *        0: end of the period, e.g. end of month (default)
	 *        1: beginning of period
	 */
	let pmt;
	let presentValueif;

	if (interestRate === 0)
		return -(presentValue + futureValue) / numberOfMonths;

	presentValueif = Math.pow(1 + interestRate, numberOfMonths);
	pmt = - interestRate * presentValue * (presentValueif + futureValue) / (presentValueif - 1);

	if (type === 1)
		pmt /= (1 + interestRate);

	return pmt;
}

export {
	pmt
};
