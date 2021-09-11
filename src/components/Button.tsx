import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react"
import clsx from "clsx"


type ButtonProps = {
  underline?: boolean
  content?: ReactNode
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button: FC<ButtonProps> = ({ underline = true, content, children, className, ...restProps }) => (
  <button
    className={clsx(
      underline && "hover:underline",
      "uppercase sm:tracking-wider text-sm sm:text-lg whitespace-nowrap",
      className
    )}
    {...restProps}
  >
    {content ?? children}
  </button>
)

export default Button
