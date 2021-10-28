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

export type PostPreview = {
  html: string
}
