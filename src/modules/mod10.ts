/**
*
* Modulus 10 is an algorithm to validate a number
*
* Reference: 
* Section 1.1 10-modulmetoden
* https://www.bankgirot.se/globalassets/dokument/anvandarmanualer/bankernaskontonummeruppbyggnad_anvandarmanual_sv.pdf 
* 
* @param {number} nr - input number.
* 
* @returns {boolean} boolean if the number is valid or not
* 
*/
export const mod10 = (nr: string): boolean => {
    const w = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

    var l = nr.length; 
    var b = 1;
    let s = 0; 
    let v;
   
    while (l) {
        v = parseInt(nr.charAt(--l), 10);
        s += (b ^= 1) ? w[v] : v;
    }

    return Boolean(s && s % 10 === 0);
  };