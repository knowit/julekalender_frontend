export interface Comment {
  uuid: string;
  content: string;
  author: {
    nickname: string;
    picture: string;
  };
  created_at: Date;
  edited_at: Date | null;
  likes: number;
  liked_by_me: boolean;
}

interface ParentComment extends Comment {
  children?: Comment[];
}

export default ParentComment;

