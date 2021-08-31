import { FC } from "react"
import { motion } from "framer-motion"

import { easeOutCubic } from "../../utils"

import Wrapper, { CheckmarkWrapperProps } from "./Wrapper"


const offset = 65.1
const r = 62.1

export const WrongMark: FC<CheckmarkWrapperProps> = (props) => (
  <Wrapper {...props}>
    <svg className="text-red-700 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
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
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="6"
        d="M34.4 37.9L95.8 92.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.2, delay: 0.4 }}
      />
      <motion.path
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="6"
        d="M95.8 38L34.4 92.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      />
    </svg>
    <p className="text-lg text-center mt-8">Feil svar!</p>
  </Wrapper>
)

export default WrongMark
