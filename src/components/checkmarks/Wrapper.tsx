import { FC } from "react"
import clsx from "clsx"


export type CheckmarkWrapperProps = {
  className?: string
}

const CheckmarkWrapper: FC<CheckmarkWrapperProps> = ({ children, className }) => (
  <div className={clsx("w-28", className)}>
    {children}
  </div>
)

export default CheckmarkWrapper
