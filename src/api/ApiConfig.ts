export const apiUrl = window.location.hostname === 'julekalender.knowit.no'
    ? 'https://julekalender-backend.knowit.no'
    : 'https://julekalender-backend-dev.knowit.no';
export const requestHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }