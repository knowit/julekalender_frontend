import { FC, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

import { easeInCubic, easeOutCubic } from "../../utils"

import Wrapper, { CheckmarkWrapperProps } from "./Wrapper"
import clsx, { ClassValue } from "clsx"


const OFFSET = 65.1
const R = 62.1

export const WaitMark: FC<CheckmarkWrapperProps &  { retryAfter: number, className: ClassValue }> = ({ retryAfter, className, ...props }) => {
  const [countdown, setCountdown] = useState(retryAfter)
  const circleControls = useAnimation()

  useEffect(() => {
    const interval = setInterval(() => setCountdown((x) => x > 0 ? x - 1 : x), 1000)

    return () => clearInterval(interval)
  }, [setCountdown])

  useEffect(() => {
    circleControls.start({
      pathLength: (countdown - 1) / retryAfter,
      transition: { duration: 1, ease: "linear" }
    })
  }, [countdown, retryAfter])

  return (
    <Wrapper {...props}>
      <svg className={clsx("text-lightbulb-yellow stroke-current mx-auto", className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
        <motion.path
          d={`
            M ${OFFSET} ${OFFSET}
            m 0 ${-R}
            a ${R}, ${R} 0 1, 1 0 ${2*R}
            a ${R}, ${R} 0 1, 1 0 ${-2*R}
          `}
          fill="none"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="6"
          animate={circleControls}
          initial={{ pathLength: 1 }}
        />
        <motion.path
          d={`
            M ${OFFSET} ${OFFSET}
            m -15.7 -27.2
            v 54.4
          `}
          fill="none"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.2, delay: 0.4, ease: easeInCubic }}
        />
        <motion.path
          d={`
            M ${OFFSET} ${OFFSET}
            m 15.7 -27.2
            v 54.4
          `}
          fill="none"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.2, delay: 0.2, ease: easeInCubic }}
        />
      </svg>
      <p className="text-center mt-1">
        {countdown} sekund{countdown !== 1 && "er"}
      </p>
    </Wrapper>
  )
}

export default WaitMark
