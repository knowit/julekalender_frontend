import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react"

import FormElementCustom from "./FormElementCustom"


type FormElementProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string
  note?: string
}

const FormElement = forwardRef<HTMLInputElement, FormElementProps>(
  ({ label, note, ...inputProps }, ref) => (
    <FormElementCustom label={label} note={note}>
      <input ref={ref} className="block form-input" {...inputProps} />
    </FormElementCustom>
  )
)

export default FormElement
