import { FC } from "react"
import { motion } from "framer-motion"

import { easeInOutCubic, easeOutCubic } from "../../utils"

import Wrapper, { CheckmarkWrapperProps } from "./CheckmarkWrapper"


const OFFSET = 65.1
const R = 62.1

export const CheckMark: FC<CheckmarkWrapperProps> = (props) => (
  <Wrapper {...props}>
    <svg className="text-green-600 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
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
          m -35.3 2.4
          l 21.7 21.3, 44.7 -44.6
        `}
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: easeInOutCubic }}
      />
    </svg>
  </Wrapper>
)

export default CheckMark
