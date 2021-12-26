import { VFC } from "react"
import { Link } from "react-router-dom"

import useCurrentTime from "../hooks/useCurrentTime"
import { getRaffleEnd } from "../utils"


const RaffleNotification: VFC = () => {
  const currentTime = useCurrentTime()

  if (currentTime < getRaffleEnd()) return null

  return (
    <div className="mx-auto text-center p-4 w-10/12 max-w-[40rem]">
      NB!
      <br />
      Konkurransen er over for denne gang, men du kan fortsette å svare på luker
      og skrive innlegg til vi skrur av tjenesten en gang i løpet av januar.
      <br />
      Løsninger for årets luker finner du <Link to="/solutions" className="underline">her</Link>.
    </div>
  )
}

export default RaffleNotification
