/**
 * @param  headers - request headers should be an object with key-value pair
 * if @param headers is empty - value is set as empty object
 * @returns headers object
 */
export const generateHeaders = (headers = { }) => {
    // If Content-Type is not specified - set 'application/json'
    if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    return headers;
};
