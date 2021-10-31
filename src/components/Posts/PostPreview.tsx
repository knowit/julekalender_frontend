import clsx from "clsx"
import { VFC } from "react"

import { usePostPreview } from "../../api/requests"


type PostPreviewProps = {
  content: string | undefined
  className?: string
}

const PostPreview: VFC<PostPreviewProps> = ({ content, className }) => {
  const { data: previewContent, isLoading } = usePostPreview(content)

  if (!previewContent && isLoading) return null
  if (!previewContent) return <div>Her ser noe ut til å ha gått galt...</div>

  return (
    <div className={clsx("bg-gray-100 text-gray-700 rounded-md p-4 flex flex-col", className)}>
      <div
        className="prose h-full w-full"
        dangerouslySetInnerHTML={{ __html: previewContent.html }}
      />
    </div>
  )
}

export default PostPreview
