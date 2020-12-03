export const getTimeStamp = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth()+1).padStart(2, '0')
    const hrs = String(date.getHours()).padStart(2, '0')
    const mins = String(date.getMinutes()).padStart(2, '0')

    return `${day}.${month} kl ${hrs}:${mins}`
};

export const beforeDoorDate2020 = (door: number | string) => (
  new Date() < new Date(Date.parse(`2020-12-${door}T04:00`))
);
