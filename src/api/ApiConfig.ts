export const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://julekalender-backend.knowit.no'
    : 'https://***REMOVED***';
export const requestHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }