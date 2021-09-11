import { FC } from "react"
import clsx from "clsx"

import { ReactComponent as Chevron } from "../svg/expand_more.svg"


type ToggleChildPostsButtonProps = {
  className?: string
  showChildPosts: boolean
  toggleShowChildPosts: () => void
  numChildPosts: number
}

const ToggleChildPostsButton: FC<ToggleChildPostsButtonProps> = ({ className, showChildPosts, toggleShowChildPosts, numChildPosts }) => {
  if (numChildPosts === 0) return null

  return (
    <button className={clsx(className)} onClick={toggleShowChildPosts}>
      <span className="w-4/5">{showChildPosts ? "Skjul" : "Vis"} {numChildPosts} svar</span>
      <Chevron className={clsx("ml-1 inline w-4 transition-all duration-500", showChildPosts && "transform -rotate-180")} />
    </button>
  )
}

export default ToggleChildPostsButton
