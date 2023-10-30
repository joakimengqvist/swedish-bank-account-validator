### Swedish bank account validator
Validation logic for swedish bank accounts according to public bank account format documents

The validation is built around bank information from centralized bank details information from [bankgirot.se](https://www.bankgirot.se/ "bankgirot.se"). The document used as validation logic in this package can be found here: [Bank account validation document](https://www.bankgirot.se/globalassets/dokument/anvandarmanualer/bankernaskontonummeruppbyggnad_anvandarmanual_sv.pdf "Bank account validation document").

#### To run and install this package
`$ npm install swedish-bank-account-validator`

	import { accountAndClearingCheck } from 'swedish-bank-account-validator'
    const validationObject = accountAndClearingCheck(1234, 123456789);

#### Functions

* **accountAndClearingCheck**
	 takes clearing and account number as input and returns an object with validation information.
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

* **clearingNumberCheck**
	 takes clearing number as input and returns an object with validation information.
    	name: string
    	number: string
    	valid: boolean
    	errorType: string
    	hasWarning: boolean
    	warningType: string

* **accountNumberCheck**
	 takes account number as input and returns an object with validation information.
    	number: string
    	valid: boolean
    	errorType: string

* **getBankDataFromClearingNumber**
	 takes clearing number as input and returns an object with bank information user for validation logic.
    	name: string
    	number: string
    	valid: boolean
    	errorType: string
    	hasWarning: boolean
    	warningType: string

#### Returned values
there are 2 different kind of validation failures present in the return objects. The strict validation is if there is an error in the format of either account or clearing number. These are strict and can be considered to determine that the input numbers are not valid. The second validation is the warning key valye pair. The warning is true if the bank account did not match a format provided by the algorithms. It is returned as a warning as it might not be 100% accurate. The only way for the bank account validation to be 100% correct is to use an open banking API. This static bank account check is however very accurate, and most failures in giving a false positive it connected to Swedbank since they have a different format in relation to other banks as stated in the validation document.

#### Other information

##### Terms of usage (MIT) - [Lisence](https://github.com/joakimengqvist/swedish-bank-account-validator/blob/master/LICENSE.txt)

Basicly feel free to use, fork etc. But The author takes no responsibility of the code as stated in the license.
