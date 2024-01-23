// validation functions
const accountAndClearingCheck = require('./accountAndClearingCheck.ts');
const accountNumberCheck = require('./accountNumberCheck.ts');
const clearingNumberCheck = require('./clearingNumberCheck.ts');
const getBankDataFromClearingNumber = require('./getBankDataFromClearingNumber.ts');
const mod10 = require('./modules/mod10.ts');
const mod11 = require('./modules/mod11.ts');
const banks = require('./data/banks.ts');

// enums
const Errors = require('./enums/errors.ts');
const Warnings = require('./enums/warnings.ts');

// types
const BankData = require('./types/types.ts').BankData;
const BankValidationResponse = require('./types/types.ts').BankValidationResponse;
const AccountValidationRespone = require('./types/types.ts').AccountValidationRespone;
const ClearingValidationResponse = require('./types/types.ts').ClearingValidationResponse;


module.exports = {
    accountAndClearingCheck,
    accountNumberCheck,
    clearingNumberCheck,
    getBankDataFromClearingNumber,
    mod10,
    mod11,
    banks,
    Errors,
    Warnings,
    BankData,
    BankValidationResponse,
    AccountValidationRespone,
    ClearingValidationResponse
};
