import Comments from "../components/Comments";

export interface Comment {
  uuid: string;
  content: string;
  user_id: number; // Will be nickname and picture
  created_at: Date;
  edited_at: Date | null;
  likes: number;
  liked_by_me: boolean;
}

interface ParentComment extends Comment {
  children?: Comment[];
}

export default ParentComment;

