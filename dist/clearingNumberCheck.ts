// Source for validation: https://www.bankgirot.se/globalassets/dokument/anvandarmanualer/bankernaskontonummeruppbyggnad_anvandarmanual_sv.pdf
// Inspiration for solution: https://github.com/jop-io/kontonummer.js

// Latest draft of bank details can be found at: https://www.bankgirot.se

import { Warnings } from "./enums/warnings";
import { Errors } from "./enums/errors";
import { getBankDataFromClearingNumber } from "./getBankDataFromClearingNumber";
import { ClearingValidationResponse } from './types/types';

/**
 * Validates a clearing number.
 * 
 * @param {number} cl_nr - clearing number.
 * 
 * @returns {ClearingValidationResponse} {
 * - name: string
 * - Name of the bank
 * * number: string - 
 * * The input of clearing number
 * - valid: boolean
 * - If the clearing number is valid or not
 * * errorType: string
 * * If the clearing number is invalid, this will be the error type
 * - hasWarning: boolean 
 * - If the clearing number is valid, but not in the latest draft of bank details, this will be true
 * * warningType: string 
 * * If the clearing number is valid, but not in the latest draft of bank details, this will be the warning type
 * 
 * }
 */
export const clearingNumberCheck = (
  cl_nr: string,
): ClearingValidationResponse => {

const resp = {
    name: '',
    number: '',
    valid: true,
    errorType: '',
    hasWarning: false,
    warningType: '',
  }

  if (cl_nr.length === 0) {
    return {
        ...resp,
        number: cl_nr,
        valid: false,
        errorType: Errors.empty,
        
    }
  }

  if (!/^\d+$/.test(cl_nr)) {
    return {
        ...resp,
        number: cl_nr,
        valid: false,
        errorType: Errors.invalidCharacters,
    }
  }

  if (cl_nr.length > 5) {
    return {
        ...resp,
        number: cl_nr,
        valid: false,
        errorType: Errors.tooLong,
    }
  }

  if (cl_nr.length < 4) {
    return {
        ...resp,
        number: cl_nr,
        valid: false,
        errorType: Errors.tooShort,
    }
  }

  const bankData = getBankDataFromClearingNumber(cl_nr);

  if (!bankData) {
    return {
        ...resp,
        number: cl_nr,
        hasWarning: true,
        warningType: Warnings.unvalidClearing,
    };
  }

  return {
    ...resp,
    name: bankData.name,
    number: cl_nr,
  };
};
  
  