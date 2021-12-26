import { useEffect, useState } from "react"


const useCurrentTime = () => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 5000)
    return () => clearInterval(interval)
  }, [setDate])

  return date
}

export default useCurrentTime
