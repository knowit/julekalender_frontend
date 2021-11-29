import { useCallback, useState } from "react"


const useBoolean = (init?: boolean): [boolean | undefined, () => void, () => void] => {
  const [state, setState] = useState(init)
  const setTrue = useCallback(() => setState(true), [])
  const setFalse = useCallback(() => setState(false), [])

  return [state, setTrue, setFalse]
}

export default useBoolean
