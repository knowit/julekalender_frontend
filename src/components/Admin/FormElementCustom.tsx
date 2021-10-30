import { FC } from "react"


type FormElementCustomProps = {
  label: string
  note?: string
}

// TODO: className
const FormElementCustom: FC<FormElementCustomProps> = ({ label, note, children }) => (
  <label className="block space-y-1">
    <span className="text-lg font-medium">
      {label}
      {note && <>&emsp;<em className="text-opacity-60 text-gray-700 text-base font-normal">{note}</em></>}
    </span>

    {children}
  </label>
)

export default FormElementCustom
