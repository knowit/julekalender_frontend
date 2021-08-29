import { constant } from "lodash"


export type Comment = {
  uuid: string
  parent_uuid: string | null
  content: string // '' if deleted
  author: {
    uuid: string
    nickname: string
    picture: string
  }
  created_at: string
  edited_at: string | null
  likes: number
  deleted: boolean
}

export const makeDeletedComment = constant({ content: "", markdown_content: "", edited_at: null, likes: 0, deleted: true })

export type ParentComment = {
  children: Comment[]
} & Comment

export type CreateCommentPayload = {
  content: string
  parent_uuid?: string
}

export default ParentComment

