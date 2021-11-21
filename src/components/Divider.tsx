import clsx from "clsx"
import { VFC } from "react"


type DividerProps = {
  bgClasses?: string
  textClasses?: string
  content?: string
}

const Divider: VFC<DividerProps> = ({ bgClasses = "bg-opacity-20 bg-gray-700", textClasses = "text-opacity-40 text-gray-700 bg-gray-100", content }) => (
  <div
    className={clsx(
      "w-11/12 h-[2px] mx-auto rounded-full relative",
      bgClasses
    )}
  >
    {content && <span className={clsx("absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-2", textClasses)}>{content}</span>}
  </div>
)

export default Divider
