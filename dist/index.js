

const accountAndClearingCheck = require('./accountAndClearingCheck.ts');
const accountNumberCheck = require('./accountNumberCheck.ts');
const clearingNumberCheck = require('./clearingNumberCheck.ts');
const getBankDataFromClearingNumber = require('./getBankDataFromClearingNumber.ts');
const mod10 = require('./modules/mod10.ts');
const mod11 = require('./modules/mod11.ts');
const banks = require('./data/banks.ts');
const Errors = require('./enums/errors.ts');
const Warnings = require('./enums/warnings.ts');

module.exports = {
    accountAndClearingCheck,
    accountNumberCheck,
    clearingNumberCheck,
    getBankDataFromClearingNumber,
    mod10,
    mod11,
    banks,
    Errors,
    Warnings
};
