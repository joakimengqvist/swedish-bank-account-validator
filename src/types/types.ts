/**
 * Represents bank data.
 *
 * @param {string} type - Type of the bank.
 * @param {string} name - Name of the bank.
 * @param {string} cl_series - Clearing series information.
 * @param {string} ac_format - Account format.
 * @param {string} LogicType - Type of logic used.
 */
type BankData = {
  type: string
  name: string
  cl_series: string
  ac_format: string
  LogicType: string
}  

/**
  * Represents the response object for bank validation.
*/
type BankValidationResponse = {
    name: string | undefined
    hasWarning: boolean
    warningType: string
    clearing: {
        number: string
        valid: boolean
        errorType: string
    },
    account: {
        number: string
        valid: boolean
        errorType: string
    },
}
  
/**
  * Represents the response object for account number validation.
*/
type AccountValidationRespone = {
  number: string
  valid: boolean
  errorType: string
}

/**
  * Represents the response object for clearing number validation.
*/
type ClearingValidationResponse = {
    name: string
    number: string
    valid: boolean
    errorType: string
    hasWarning: boolean
    warningType: string
  }

  export {
    BankData,
    BankValidationResponse,
    AccountValidationRespone,
    ClearingValidationResponse
  };
