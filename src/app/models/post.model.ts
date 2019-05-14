import {User} from './user.model';

export class Post {
  id?: string;
  title: string;
  contents: string;
  category: string;
  username: string;
  commentCount?: number;
  likeCount?: number;
  liked?: boolean;
}
