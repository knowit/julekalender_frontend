import { FC, useContext, useEffect, useState } from "react"
import clsx from "clsx"

import CheckMark from "../checkmarks/CheckMark"
import WrongMark from "../checkmarks/WrongMark"
import { AuthContext } from "../../AuthContext"
import { useCreateSolution } from "../../api/requests"
import useIsDoorSolved from "../../hooks/useIsDoorSolved"
import WaitMark from "../checkmarks/WaitMark"


type InputProps = {
  door: number
}

const Input: FC<InputProps> = ({ door }) => {
  const { isFullyAuthenticated } = useContext(AuthContext)

  const [attemptCount, setAttemptCount] = useState(0)
  const [answer, setAnswer] = useState("")
  const [dirty, setDirty] = useState(false)
  const isDoorSolved = useIsDoorSolved(door)

  const { mutate: createSolution, isLoading, error, reset } = useCreateSolution()
  const [rateLimitTimeout, setRateLimitTimeout] = useState(0)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined

    if (error?.status === 429 && error.headers["retry-after"]) {
      const retryAfter = parseInt(error.headers["retry-after"])

      setRateLimitTimeout(retryAfter)
      timeout = setTimeout(() => {
        setRateLimitTimeout(0)
        setAttemptCount(0)
        reset()
      }, retryAfter * 1000)
    }

    return () => timeout && clearTimeout(timeout)
  }, [error, setRateLimitTimeout, setAttemptCount, reset])

  const submitAnswer = () => {
    createSolution({ door, answer })
    setDirty(false)
    setAttemptCount((count) => count + 1)
  }

  const isWrongAnswer = !isDoorSolved && attemptCount > 0 && !isLoading && !dirty

  if (!isDoorSolved && !isFullyAuthenticated) return <p>Logg inn for å delta!</p>

  if (isDoorSolved) {
    return (
      <CheckMark
        wrapperClassName="w-28 mx-auto"
        message={`Bra jobba!${door === 24 ? <><br />Og god jul! 🥳</> : ""}`}
        scrollTo={attemptCount > 0}
      />
    )
  }

  // Rate limit exceeded
  if (rateLimitTimeout > 0 && error) {
    return (
      <WaitMark
        wrapperClassName="w-48 mx-auto"
        className="w-28"
        message={error.message}
        retryAfter={rateLimitTimeout}
        scrollTo
      />
    )
  }

  return (
    <>
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
      {(isWrongAnswer || error) && (
        <WrongMark
          wrapperClassName="w-28 mx-auto mt-8"
          message={error?.message ?? "Feil svar!"}
          scrollTo
        />
      )}
    </>
  )
}

export default Input
