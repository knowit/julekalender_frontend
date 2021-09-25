import { FC, useContext, useState } from "react"
import clsx from "clsx"
import { isEmpty } from "lodash"

import CheckMark from "../checkmarks/CheckMark"
import WrongMark from "../checkmarks/WrongMark"
import { AuthContext } from "../../AuthContext"
import { useCreateSolution } from "../../api/requests"
import useIsDoorSolved from "../../hooks/useIsDoorSolved"


type InputProps = {
  door: number
}

const Input: FC<InputProps> = ({ door }) => {
  const { isFullyAuthenticated } = useContext(AuthContext)

  // TODO: Handle rate limit
  const { mutate: createSolution, isLoading } = useCreateSolution()
  const [attemptCount, setAttemptCount] = useState(0)
  const [answer, setAnswer] = useState("")
  const [dirty, setDirty] = useState(false)
  const isDoorSolved = useIsDoorSolved(door)

  const submitAnswer = () => {
    createSolution({ door, answer })
    setDirty(false)
    setAttemptCount((count) => count + 1)
  }

  const isWrongAnswer = !isDoorSolved && attemptCount > 0 && !isLoading && !dirty

  if (!isDoorSolved && !isFullyAuthenticated) return <p>Logg inn for å delta!</p>

  if (isDoorSolved) return (<>
    <CheckMark className="mx-auto" />
    <div className="text-lg text-center mt-8">
      Bra jobba!{door === 24 && <><br />Og god jul! 🥳</>}
    </div>
  </>)

  return (<>
    <input
      className={clsx("h-8 w-full p-0 bg-transparent border-0 border-current border-b", { "text-red-700": isWrongAnswer })}
      placeholder="Ditt svar:"
      value={answer}
      onChange={(e) => {
        setAnswer(e.target.value)
        setDirty(true)
      }}
      onKeyPress={(e) => { if (e.key === "Enter") { submitAnswer() }}}
    />
    <button className="block mx-auto mt-2" disabled={!answer} onClick={() => submitAnswer()}>Send inn svar</button>
    {isWrongAnswer && <WrongMark className="mx-auto mt-8" />}
  </>)
}

export default Input
