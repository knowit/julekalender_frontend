import clsx from "clsx"
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react"

import FormElementCustom from "./FormElementCustom"


type FormElementProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string
  note?: string
  disabled?: boolean
}

const FormElement = forwardRef<HTMLInputElement, FormElementProps>(
  ({ label, note, disabled, ...inputProps }, ref) => (
    <FormElementCustom label={label} note={note} disabled={disabled}>
      <input
        ref={ref}
        className={clsx("block form-input", disabled && "border-opacity-30 border-gray-500")}
        disabled={disabled}
        {...inputProps}
      />
    </FormElementCustom>
  )
)

export default FormElement
