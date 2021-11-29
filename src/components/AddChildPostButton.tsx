import { FC } from "react"
import { FaCommentMedical } from "react-icons/fa"


type AddChildPostButtonProps = {
  toggleShowForm: () => void
}

const AddChildPostButton: FC<AddChildPostButtonProps> = ({ toggleShowForm }) => (
  <button className="space-x-2 text-gray-600 hover:text-gray-800" onClick={toggleShowForm}>
    <span className="!text-gray-700">
      Legg til svar
    </span>
    <FaCommentMedical
      className="inline-block"
    />
  </button>
)

export default AddChildPostButton
