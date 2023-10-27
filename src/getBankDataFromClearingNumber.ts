import { withinRange } from './helpers/withinRange';
import { banks } from './data/banks';
import { BankData } from './types/types';

/**
 * Function that returns bank data from clearing number.
 * The bankData object contains information about the bank that is used for validation.
 * @param {number} cl_nr - clearing number.
 * @returns {BankData} {
 * * type: string
 * * Type of the bank to determine check algorithm
 * - name: string
 * - Name of the bank
 * * cl_series: string
 * * Clearing series information
 * - ac_format: string
 * - Account format
 * * LogicType: string
 * * Type of logic used to determine check algorithm
 *
 * }
 */
export const getBankDataFromClearingNumber = (
    cl_nr: string
  ): BankData | null => {
    let bankData = null;

    // If clearing number is 5 digits, remove last one
    cl_nr = cl_nr.length === 5 ? cl_nr.slice(0, -1) : cl_nr;
  
    banks.forEach(bank => {
        if (bank.cl_series.includes('-')) {
            let cl_series = bank.cl_series.split('-');
    
            if (withinRange(cl_nr, cl_series[0], cl_series[1])) {
                bankData = bank;
            }
  
        // Handle clearing series with slash (/)
        } else if (bank.cl_series.includes('/')) {
            let cl_series = bank.cl_series.split('/');
    
            cl_series.forEach((clearing) => {
                if (clearing === cl_nr) {
                    bankData = bank;
                }
            });
        }
        });
    
        // Return bank row that is within clering number range
        return bankData;
    };
    