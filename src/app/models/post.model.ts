import {User} from './user.model';
import { PostContent } from './PostContent.model';

export class Post {
  id?: string;
  title: string;
  postContent: PostContent[];
  category: string;
  username: string;
  commentCount?: number;
  likeCount?: number;
  starCount?: number;
  liked?: boolean;
  creationDate: string;
}
