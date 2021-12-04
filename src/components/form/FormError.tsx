import { FieldError } from "react-hook-form"

const FormError = ({ error }: { error: FieldError | undefined }) => (
  error
    ? (
      <div className="!mt-0">
        <em className="text-red-700">{error.message}</em>
      </div>
      )
    : null
)

export default FormError
