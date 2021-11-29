export type BasePost = {
  uuid: string
  content: string // '' if deleted
  door: number
  author: {
    uuid: string
    username: string
    avatar: string | null
  }
  created_at: string
  edited_at: string | null
  likes: number
  deleted: boolean
}

export type ChildPost = BasePost & {
  parent_uuid: string
}

export type ParentPost = BasePost & {
  parent_uuid: null
  children: ChildPost[]
}

export type Post = ChildPost | ParentPost

export type PostPreview = {
  html: string
}
