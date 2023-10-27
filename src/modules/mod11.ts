/**
* 
* Modulus 11 is an algorithm to validate a number
*
* Reference: 
* 1.2 11-modulmetoden
* https://www.bankgirot.se/globalassets/dokument/anvandarmanualer/bankernaskontonummeruppbyggnad_anvandarmanual_sv.pdf
*
* @param {number} nr - input number.
* 
* @returns {boolean} boolean if the number is valid or not
* 
*/
export const mod11 = (nr: string): boolean => {
    const w = [1, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    let l = nr.length;
    let v;
    let s = 0;
    var a = w.splice(w.length-l, l);

    while (l) {
        v = parseInt(nr.charAt(--l), 10);
        s += a[l] * v;
    }

    return Boolean(s && s % 11 === 0);
  };