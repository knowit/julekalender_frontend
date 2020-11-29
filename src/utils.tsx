export const getTimeStamp = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth()} kl ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
};