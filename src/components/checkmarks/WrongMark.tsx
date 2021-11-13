import { FC } from "react"
import { motion } from "framer-motion"

import { easeInCubic, easeOutCubic } from "../../utils"

import Wrapper, { CheckmarkWrapperProps } from "./CheckmarkWrapper"


const OFFSET = 65.1
const R = 62.1

export const WrongMark: FC<CheckmarkWrapperProps> = (props) => (
  <Wrapper {...props}>
    <svg className="text-red-700 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
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
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: easeOutCubic }}
      />
      <motion.path
        d={`
          M ${OFFSET} ${OFFSET}
          m -30.7 -27.2
          l 61.4 54.4
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
          m 30.7 -27.2
          l -61.4 54.4
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
  </Wrapper>
)

export default WrongMark
