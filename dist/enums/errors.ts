/**
 * Enum representing error types.
 * @enum {string}
 * empty - Indicates an empty entry.
 * * tooLong - Indicates an entry that is to long.
 * * tooShort - Indicates an entry that is to short.
 * * invalidCharacters - Indicates an entry with unvalid characters.
 * 
 */
export enum Errors {
    empty = 'empty',
    tooLong = 'too-long',
    tooShort = 'too-short',
    invalidCharacters = 'invalidCharacters',
}
