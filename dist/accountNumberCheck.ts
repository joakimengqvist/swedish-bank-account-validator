import { Errors } from "./enums/errors";
import { AccountValidationRespone } from './types/types';

/**
 * Validates an account number.
 * 
 * @param {number} acc_nr - account number.
 * 
 * @returns {AccountValidationRespone} {
 * * number: string - 
 * * The input of clearing number
 * - valid: boolean
 * - If the clearing number is valid or not
 * * errorType: string
 * * If the clearing number is invalid, this will be the error type
 * 
 * }
 */
export const accountNumberCheck = (
  acc_nr: string,
): AccountValidationRespone => {

const resp = {
    number: '',
    valid: true,
    errorType: '',
  }

  if (acc_nr.length === 0) {
    return {
        number: acc_nr,
        valid: false,
        errorType: Errors.empty,
    }
  }

  if (!/^\d+$/.test(acc_nr)) {
    return {
        number: acc_nr,
        valid: false,
        errorType: Errors.invalidCharacters,
    }
  }

  if (acc_nr.length > 10) {
    return {
        number: acc_nr,
        valid: false,
        errorType: Errors.tooLong,
    }
  }

  if (acc_nr.length < 5) {
    return {
        number: acc_nr,
        valid: false,
        errorType: Errors.tooShort,
    }
  }

  return {
    ...resp,
    number: acc_nr,
  };
};
  
  