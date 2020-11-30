export const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://julekalender-backendknowit.no'
    : 'https://julekalender-backend-dev.knowit.no';
export const requestHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }