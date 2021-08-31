import { FC } from "react"
import { motion } from "framer-motion"

import { easeInOutCubic, easeOutCubic } from "../../utils"

import Wrapper, { CheckmarkWrapperProps } from "./Wrapper"


const offset = 65.1
const r = 62.1

export const CheckMark: FC<CheckmarkWrapperProps> = (props) => (
  <Wrapper {...props}>
    <svg className="text-green-600 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
      <motion.path
        d={`M${offset} ${offset}m0 ${-r}a${r} ${r} 0 1 1 0 ${2*r}a${r} ${r} 0 1 1 0 ${-2*r}`}
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: easeOutCubic }}
      />
      <motion.path
        d="M29.8 67.5L51.5 88.8 100.2 40.2"
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
