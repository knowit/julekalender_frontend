import clsx from "clsx"
import { memo, useState, VFC } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"

import { AdminChallenge, AdminChallengePayload } from "../../api/admin/Challenge"
import { useChallengePreview } from "../../api/admin/requests"
import Button from "../Button"
import Challenge from "../Door/Challenge"

import FormElement from "./FormElement"
import FormElementCustom from "./FormElementCustom"


type ChallengeFormProps = {
  challenge: AdminChallenge
  submit: (challenge: AdminChallengePayload) => void
}

const ChallengeForm: VFC<ChallengeFormProps> = ({ challenge, submit }) => {
  const [preview, setPreview] = useState<boolean>(false)

  const [author, setAuthor] = useState(challenge.author)
  const [title, setTitle] = useState(challenge.title)
  const [answer, setAnswer] = useState(challenge.answer)
  const [markdownContent, setMarkdownContent] = useState(challenge.markdown_content)

  const { data: markdownPreview } = useChallengePreview(markdownContent, { enabled: preview })

  return (
    <div className="space-y-8">
      <div className="space-x-4">
        <Button onClick={() => submit({ title, author, answer, markdown_content: markdownContent })}>Lagre</Button>
        <Button className="uppercase" onClick={() => setPreview((state) => !state)}>{preview ? "Rediger" : "Forhåndsvisning"}</Button>
      </div>

      <div className={clsx("space-y-4", preview && "hidden")}>
        <FormElement label="Tittel" type="text" value={challenge.title} onChange={({ target: { value } }) => setTitle(value)} />
        <FormElement label="Forfatter" type="text" value={challenge.author} onChange={({ target: { value } }) => setAuthor(value)} />
        <FormElement label="Svar" note="omringende whitespace blir ignorert" type="text" value={challenge.answer} onChange={({ target: { value } }) => setAnswer(value)} />

        {/* TODO: Attachments. ActiveStorage? */}

        <FormElementCustom label="Innhold" note="tittel-elementet blir erstattet med tittel fra over">
          <TextareaAutosize
              className="w-full"
              defaultValue={challenge.markdown_content}
              // TODO: Type of value
              onChange={({ target: { value } }) => setMarkdownContent(value)}
            />
        </FormElementCustom>
      </div>
      {preview && markdownPreview && (
        <Challenge challenge={{ ...challenge, title, author, content: markdownPreview.html }} />
      )}
    </div>
  )
}

export default memo(ChallengeForm)
