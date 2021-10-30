import clsx from "clsx"
import { VFC } from "react"

import { useChallengePreview } from "../../api/requests"


type ChallengePreviewProps = {
  markdownContent: string
}
const ChallengePreview: VFC<ChallengePreviewProps> = ({ markdownContent }) => {
  const { data: previewChallenge } = useChallengePreview(markdownContent)

  if (!previewChallenge) return null

  return (
    <div className={clsx("bg-gray-100 text-gray-700 rounded-md p-4 flex flex-col")}>
      <div
        className="prose h-full w-full"
        dangerouslySetInnerHTML={{ __html: previewChallenge.html }}
      />
    </div>
  )
}

export default ChallengePreview
