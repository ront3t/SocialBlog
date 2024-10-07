import { IPostsUser as User} from "./user";
import { IComment } from "./comment";


export interface CreatePostValues{
	text?:string,
	img?:string | null,
}

export interface PostValues extends CreatePostValues{
    _id: string;
    userId: User;
    comments: IComment[];
    likes: string[]; 
	createdAt: Date;
};

export interface PostsProps {
	feedType:string,
	username?:string,
	userId?:string,
}

