// Source for validation: https://www.bankgirot.se/globalassets/dokument/anvandarmanualer/bankernaskontonummeruppbyggnad_anvandarmanual_sv.pdf
// Inspiration for solution: https://github.com/jop-io/kontonummer.js

// Latest draft of bank details can be found at: https://www.bankgirot.se

import { getBankDataFromClearingNumber } from "./getBankDataFromClearingNumber";
import { BankValidationResponse } from './types/types';

import { Warnings } from "./enums/warnings";
import { Errors } from "./enums/errors";

import { mod10 } from './modules/mod10';
import { mod11 } from './modules/mod11';
  

/**
 * Validates a complete account number together with clearing number.
 * 
 * @param {number} cl_nr - clearing number.
 * @param {number} acc_nr - account number.
 * 
 * @returns {ClearingValidationResponse} {
 * 
 * - name: string
 * - Name of the bank
 * * has warning: boolean - 
 * * If the bank account details does not pass alogorithms, this will be true
 * - warningType: boolean
 * - if there is a warning this will be the type of warning
 * 
 * * clearing: {
 * - number: string 
 * - The input of clearing number
 * * valid: boolean
 * * If the clearing number is valid or not
 * - errorType: string
 * - If the clearing number is invalid, this will be the error type
 * 
 * }
 * 
 * * account: {
 * - number: string 
 * - The input of account number
 * * valid: boolean
 * * If the account number is valid or not
 * - errorType: string
 * - If the account number is invalid, this will be the error type
 * 
 * }
 * 
 * }
 */
export const accountAndClearingCheck = (
  cl_nr: string,
  acc_nr: string
): BankValidationResponse => {

const bankData = getBankDataFromClearingNumber(cl_nr);

const resp = {
    name: bankData?.name ? bankData.name : '',
    hasWarning: false,
    warningType: Warnings.unvalid,
    clearing: {
       number: cl_nr,
       valid: true,
       errorType: ''
    },
    account: {
        number: acc_nr,
        valid: true,
        errorType: ''
    },
  }

  if (cl_nr.length === 0) {
    return {
      ...resp,
      clearing: {
        ...resp.clearing,
        valid: false,
        errorType: Errors.empty,
      }
    }
  }

  if (!/^\d+$/.test(cl_nr)) {
    return {
      ...resp,
      clearing: {
        ...resp.clearing,
        valid: false,
        errorType: Errors.invalidCharacters,
      }
    }
  }

  if (cl_nr.length > 5) {
    return {
      ...resp,
      clearing: {
        ...resp.clearing,
        valid: false,
        errorType: Errors.tooLong,
      }
    }
  }

  if (cl_nr.length < 4) {
    return {
      ...resp,
      clearing: {
        ...resp.clearing,
        valid: false,
        errorType: Errors.tooShort,
      }
    }
  }

  if (acc_nr.length === 0) {
    return {
      ...resp,
      account: {
        ...resp.account,
        valid: false,
        errorType: Errors.empty,
      }
    }
  }

  if (!/^\d+$/.test(acc_nr)) {
    return {
      ...resp,
      account: {
        ...resp.account,
        valid: false,
        errorType: Errors.invalidCharacters,
      }
    }
  }

  if (acc_nr.length > 10) {
    return {
      ...resp,
      account: {
        ...resp.account,
        valid: false,
        errorType: Errors.tooLong,
      }
    }
  }

  if (acc_nr.length < 5) {
    return {
      ...resp,
      account: {
        ...resp.account,
        valid: false,
        errorType: Errors.tooShort,
      }
    }
  }

  if (!bankData) {
    return {
      ...resp,
      hasWarning: true,
      warningType: Warnings.unvalidClearing,
    };
}

  const accountTypeOne = bankData.type === '1';
  const accountTypeTwo = bankData.type === '2';
  const accountLogicTypeOne = bankData.LogicType === '1';
  const accountLogicTypeTwo = bankData.LogicType === '2';
  const accountLogicTypeThree = bankData.LogicType === '3';

  const fullAccount = cl_nr + acc_nr;
  let number = (fullAccount).slice(fullAccount.length - 10, fullAccount.length);

  // Set the number that should be passed into the validation function
  if (accountTypeOne) {
    number = (fullAccount).slice(fullAccount.length - 7, fullAccount.length);
  }

  if (accountTypeTwo) {
    if (accountLogicTypeTwo) {
      number = (fullAccount).slice(fullAccount.length - 9, fullAccount.length);
    }

    if (accountLogicTypeThree) {
      if (fullAccount.charAt(0) === "8" ) {
        number = (cl_nr + acc_nr).slice(fullAccount.length - 5, fullAccount.length);
      }
      if (fullAccount.charAt(0) === "9" ) {
        number = (cl_nr + acc_nr).slice(fullAccount.length - 4, fullAccount.length);
      }
    }
  }

  let accountNumberValid = true;
  const swedbankTernery = (cl_nr.charAt(0) === "8" ? mod10(cl_nr) : true);

  // Make sure the correct validation is being run
  if (cl_nr === '3300' || cl_nr === '3782') {
    accountNumberValid = mod10(number);
  } else if (accountTypeOne && accountLogicTypeOne) {
      const validationInput = (cl_nr + number).slice(fullAccount.length - 10, fullAccount.length);
      accountNumberValid = mod11(validationInput);
  } else if (accountTypeOne && accountLogicTypeTwo) {
      accountNumberValid = mod11(cl_nr + number);
  } else if (accountTypeTwo && accountLogicTypeTwo) {
    accountNumberValid = mod11(number);
  } else if (mod10(number) && swedbankTernery) {
    if (acc_nr.length <= 10) {
      accountNumberValid = mod10(cl_nr);
    } else {
      accountNumberValid = false;
    }   
  }

  return {
    ...resp,
    hasWarning: !accountNumberValid
  };
};
  
  