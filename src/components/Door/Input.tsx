import { FC, useState } from "react"
import clsx from "clsx"

import useRequestsAndAuth from "../../hooks/useRequestsAndAuth"
import CheckMark from "../checkmarks/CheckMark"
import WrongMark from "../checkmarks/WrongMark"


type InputProps = {
  doorNumber: string
  isDoorSolved: boolean
  isFirstSubmit: boolean
  isWaitingForSolutionResponse: boolean
  onSubmit(answer: string): void
}

const Input: FC<InputProps> = ({ doorNumber, isDoorSolved, isFirstSubmit, isWaitingForSolutionResponse, onSubmit }) => {
  const { isAuthenticated } = useRequestsAndAuth()
  const [answer, setAnswer] = useState("")
  const [submittedAnswer, setSubmittedAnswer] = useState("")

  const isWrongAnswer = !isDoorSolved && !isFirstSubmit && !isWaitingForSolutionResponse && submittedAnswer !== "" && answer === submittedAnswer

  const submitAnswer = () => {
    onSubmit(answer)
    setSubmittedAnswer(answer)
  }

  if (!isDoorSolved && !isAuthenticated) return <p>Logg inn for å delta!</p>

  if (isDoorSolved) return (<>
    <CheckMark className="mx-auto" />
    <div className="text-lg text-center mt-8">
      Bra jobba!{doorNumber === "24" && <><br/>Og god jul! 🥳</>}
    </div>
  </>)

  return (<>
    <input
      className={clsx("h-8 w-full p-0 bg-transparent border-0 border-current border-b", { "text-red-700": isWrongAnswer })}
      placeholder="Ditt svar:"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      onKeyPress={(e) => { if (e.key === "Enter") { submitAnswer() }}}
    />
    <button className="block mx-auto mt-2" disabled={!answer} onClick={() => submitAnswer()}>Send inn svar</button>
    {isWrongAnswer && <WrongMark className="mx-auto mt-8" />}
  </>)
}

export default Input
