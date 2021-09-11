import { constant } from "lodash"


export type Post = {
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

export type ParentPost = Post & {
  children: Post[]
}

export type CreatePostPayload = {
  content: string
  parent_uuid?: string
}


export const makeDeletedPost = constant({
  content: "",
  markdown_content: "",
  edited_at: null,
  likes: 0,
  deleted: true
})
