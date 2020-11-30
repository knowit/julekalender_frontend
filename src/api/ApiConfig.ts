export const apiUrl = window.location.hostname === 'julekalender.knowit.no'
    ? 'https://julekalender-backend.knowit.no'
    : 'https://***REMOVED***';
export const requestHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }