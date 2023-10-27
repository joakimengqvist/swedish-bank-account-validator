/**
 * Enum representing error types.
 * @enum {string}
 * empty - Indicates an empty entry.
 * * tooLong - Indicates an entry that is to long.
 * * tooShort - Indicates an entry that is to short.
 * * invalidCharacters - Indicates an entry with unvalid characters.
 * 
 */
export enum ErrorTypes {
    empty = 'empty',
    tooLong = 'too-long',
    tooShort = 'too-short',
    invalidCharacters = 'invalidCharacters',
}

/**
 * Enum representing warning types.
 * @enum {string}
 * unvalid - Indicates an unvalid entry.
 * * unvalidClearing - Indicates an unvalid clearing number.
 * 
 */
export enum WarningTypes {
    unvalid = 'unvalid',
    unvalidClearing = 'unvalid-clearing',
}

