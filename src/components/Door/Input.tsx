import { FC, useState } from "react"
import clsx from "clsx"

import useRequestsAndAuth from "../../hooks/useRequestsAndAuth"

import Checkmark, { WrongMark } from "./Checkmark"


type InputProps = {
  doorNumber: string
  isDoorSolved: boolean
  isFirstSubmit: boolean
  isWaitingForSolutionResponse: boolean
  onSubmit(answer: string): void
  className?: string
}

const Input: FC<InputProps> = ({ doorNumber, isDoorSolved, isFirstSubmit, isWaitingForSolutionResponse, onSubmit, className }) => {
  const { isAuthenticated } = useRequestsAndAuth()
  const [answer, setAnswer] = useState("")
  const [submittedAnswer, setSubmittedAnswer] = useState("")

  const isWrongAnswer = !isDoorSolved && !isFirstSubmit && !isWaitingForSolutionResponse && submittedAnswer !== "" && answer === submittedAnswer

  const submitAnswer = () => {
    onSubmit(answer)
    setSubmittedAnswer(answer)
  }

  if (!isDoorSolved && !isAuthenticated) return <p>Logg inn for å delta!</p>

  return (
    <div className={clsx("w-56 py-3 px-6 mx-auto", className)}>
      {isDoorSolved
        ? <Checkmark doorNumber={doorNumber}/>
        : isAuthenticated && <>
          <input
            className={clsx("h-8 w-full p-0 bg-transparent border-0 border-current border-b", isWrongAnswer && "text-red-700")}
            placeholder="Ditt svar:"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={(e) => { if (e.key === "Enter") { submitAnswer() }}}
          />
          <button className="block mx-auto mt-2" disabled={!answer} onClick={() => submitAnswer()}>Send inn svar</button>
          {isWrongAnswer && <WrongMark />}
        </>
      }
    </div>
  )
}

export default Input
