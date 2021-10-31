import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react"
import clsx from "clsx"


type ButtonProps = {
  underline?: boolean
  content?: ReactNode
  disabled?: boolean
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button: FC<ButtonProps> = ({ underline = true, content, disabled, children, className, ...restProps }) => (
  <button
    className={clsx(
      underline && "hover:underline",
      "uppercase sm:tracking-wider text-sm sm:text-lg whitespace-nowrap",
      disabled && "text-opacity-30 text-gray-700",
      className
    )}
    disabled={disabled}
    {...restProps}
  >
    {content ?? children}
  </button>
)

export default Button
