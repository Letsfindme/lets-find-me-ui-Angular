import {User} from './user.model';

export class Post {
  id?: string;
  title: string;
  postContents: string;
  category: string;
  user: User;
  commentCount?: number;
  likeCount?: number;
  liked?: boolean;
}
