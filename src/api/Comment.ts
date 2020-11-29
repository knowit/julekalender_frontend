export interface Comment {
  uuid: string;
  content: string;
  author: {
    nickname: string;
    picture: string;
  };
  created_at: string;
  edited_at: string | null;
  likes: number;
}

interface ParentComment extends Comment {
  children: Comment[];
}

export interface CreateCommentPayload {
  content: string;
  parent_uuid?: string;
}

export default ParentComment;

