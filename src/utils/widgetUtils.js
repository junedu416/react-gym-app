export const getShortenedString = (string, maxCharacters) => {
    let newString = string.substring(0, maxCharacters);
    if (newString.length < string.length) {
        newString = `${newString}...`
    }
    return newString;
}