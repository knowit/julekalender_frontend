import { FC } from "react"
import clsx from "clsx"
import { FaChevronDown } from "react-icons/fa"

import { numberString } from "../../utils"


type ToggleChildPostsButtonProps = {
  className?: string
  showChildPosts: boolean
  toggleShowChildPosts: () => void
  numChildPosts: number
}

const ToggleChildPostsButton: FC<ToggleChildPostsButtonProps> = ({ className, showChildPosts, toggleShowChildPosts, numChildPosts }) => {
  if (numChildPosts === 0) return null

  return (
    <button className={clsx("space-x-2 text-gray-600 hover:text-gray-800", className)} onClick={toggleShowChildPosts}>
      <span className="!text-gray-700">
        {showChildPosts ? "Skjul" : "Vis"} {numberString(numChildPosts, true)} svar
      </span>
      <FaChevronDown
        className={clsx(
          "-mt-0.5 inline w-4 transition-all ease-out-cubic duration-300",
          showChildPosts && "transform -rotate-180"
        )}
      />
    </button>
  )
}

export default ToggleChildPostsButton
