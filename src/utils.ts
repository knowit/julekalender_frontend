import { format } from "date-fns"
import { padStart } from "lodash"


export const getTimeStamp = (dateString: string) => format(new Date(dateString), "dd.MM 'kl' HH:mm")

export const beforeDoorDate2020 = (door: number | string) => (
  new Date() < new Date(Date.parse(`2020-12-${padStart(door.toString(), 2, "0")}T04:00`))
)
