import { FC, ReactNode } from "react"

import SubscribeButton from "../SubscribeButton"
import { Challenge as ChallengeType } from "../../api/Challenge"

import Input from "./Input"


type ChallengeProps = {
  challenge: ChallengeType | undefined
  withoutInput?: boolean
  preamble?: ReactNode
}

const Challenge: FC<ChallengeProps> = ({ challenge, withoutInput = false, preamble }) => {
  if (!challenge) return null

  return (
    <div className="pb-8 pt-14 px-8 md:px-12 mx-2 md:mx-8 bg-gray-100 text-gray-700 rounded-md">
      {preamble}

      <div className="relative space-y-4 md:space-y-6 lg:space-y-12">
        <div className="text-center pb-4 md:pb-6 border-b-2">
          <h1 className="text-4xl font-semibold">{challenge.title}</h1>
          <p className="mt-1"><em>Av {challenge.author}</em></p>
        </div>

        <div
          className="mx-auto prose prose-sm md:prose max-w-none md:max-w-none break-words"
          dangerouslySetInnerHTML={{ __html: challenge.content }}
        />

        {!withoutInput && (
          <>
            <div className="w-56 py-3 px-6 mx-auto">
              <Input door={challenge.door} />
            </div>
            <div className="absolute bottom-0 right-0">
              <SubscribeButton door={challenge.door} className="text-xl" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Challenge
