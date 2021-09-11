import { useCallback, useState } from "react"


const useBooleanToggle = (init?: boolean): [boolean, () => void] => {
  const [state, setState] = useState(init ?? false)
  const toggle = useCallback(() => setState((state) => !state), [setState])

  return [state, toggle]
}

export default useBooleanToggle
