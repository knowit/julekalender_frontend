import clsx from "clsx"
import { FC } from "react"


type FormElementCustomProps = {
  label: string
  note?: string
  disabled?: boolean
  className?: string
}

const FormElementCustom: FC<FormElementCustomProps> = ({ label, note, disabled, className, children }) => (
  <label className={clsx("block space-y-1", disabled && "text-opacity-30 text-gray-700", className)}>
    <span className="text-lg font-medium">
      {label}
      {note && <>&emsp;<em className={clsx(disabled ? "text-opacity-20" : "text-opacity-60", "text-gray-700 text-base font-normal")}>{note}</em></>}
    </span>

    {children}
  </label>
)

export default FormElementCustom
