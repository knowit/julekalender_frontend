import { isNil } from "lodash"
import { VFC } from "react"

import PostProse from "./PostProse"


type PostPreviewProps = {
  html: string | undefined
  isLoading: boolean
  className?: string
}

const PostPreview: VFC<PostPreviewProps> = ({ html, isLoading, className }) => {
  if (isNil(html) && isLoading) return null
  if (isNil(html)) return <div>Her ser noe ut til å ha gått galt...</div>

  return <PostProse html={html} className={className} />
}

export default PostPreview
