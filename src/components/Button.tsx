import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react"
import clsx from "clsx"


type ButtonProps = {
  underline?: boolean
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button: FC<ButtonProps> = ({ underline = true, className, children, ...restProps }) => (
  <button className={clsx(underline && "hover:underline", "uppercase sm:tracking-wider text-sm sm:text-lg", className)} {...restProps}>{children}</button>
)

export default Button
