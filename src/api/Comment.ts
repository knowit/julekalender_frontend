export interface Comment {
  uuid: string;
  parent_uuid: string | null;
  content: string; // '' if deleted
  markdown_content: string; // '' if comment is not your own
  author: {
    is_self: boolean; // Author is logged in user
    nickname: string;
    picture: string;
  };
  created_at: string;
  edited_at: string | null;
  likes: number;
  deleted: boolean;
}

export const makeDeletedComment = () => ({ content: '', markdown_content: '', edited_at: null, likes: 0, deleted: true });

export interface ParentComment extends Comment {
  children: Comment[];
}

export interface CreateCommentPayload {
  content: string;
  parent_uuid?: string;
}

export default ParentComment;

