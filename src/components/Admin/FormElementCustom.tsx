import clsx from "clsx"
import { DetailedHTMLProps, FC, LabelHTMLAttributes } from "react"


type FormElementCustomProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  label: string
  note?: string
  disabled?: boolean
}

const FormElementCustom: FC<FormElementCustomProps> = ({ label, note, disabled, className, children, ...labelProps }) => (
  <label className={clsx("block space-y-1", disabled && "text-opacity-30 text-gray-700", className)} {...labelProps}>
    <span className="text-lg font-medium">
      {label}
      {note && <>&emsp;<em className={clsx(disabled ? "text-opacity-20" : "text-opacity-60", "text-gray-700 text-base font-normal")}>{note}</em></>}
    </span>

    {children}
  </label>
)

export default FormElementCustom
