import { FC, useEffect, useRef, useState } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"

import { AdminChallenge } from "../../api"
import { useChallenge } from "../../api/adminRequests"
import Button from "../Button"

import ChallengePreview from "./ChallengePreview"


type EditBoxProps = {
  door: number
}

const EditBox: FC<EditBoxProps> = ({ door }) => {
  const { data: challenge, error } = useChallenge(door)
  const [markdown, setMarkdown] = useState<string>("")
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showPreview, setShowPreview] = useState<boolean>(false)

  useEffect(() => {
    if (challenge)
      setMarkdown(challenge.markdown_content)
  }, [challenge])


  const save = () => {
    if (challenge && markdown) {
      const ch: AdminChallenge = { ...challenge }
      ch.markdown_content = markdown
      // updateChallenge({ challenge: ch }) TODO: Implement save in requests.ts
    }
  }

  if (!challenge && markdown.length > 0) return null
  return (
    <div>
      {
        !showPreview ?
            <TextareaAutosize
              className="w-full"
              ref={inputRef}
              defaultValue={markdown}
              onChange={(ev) => setMarkdown(ev.target.value)}
            />
          :
            <ChallengePreview markdownContent={markdown} />
      }
      <Button onClick={save}>Lagre</Button>
      <Button className="ml-4" onClick={() => setShowPreview((state) => !state)}>{showPreview ? "REDIGER" : "PREVIEW"}</Button>
    </div>
  )
}

export default EditBox
