import clsx from "clsx"
import { VFC } from "react"

import { usePostPreview } from "../../api/requests"


type PostPreviewProps = {
  content: string
  className?: string
}

const PostPreview: VFC<PostPreviewProps> = ({ content, className }) => {
  const { data: previewContent } = usePostPreview(content)

  if (!previewContent) return null

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
