import { IPostsUser as User} from "./user";

export interface IComment {
    _id: string;
    text: string;
    userId: User;
};