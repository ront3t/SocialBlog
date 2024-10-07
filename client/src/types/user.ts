
export type IPostsUser = {
	_id:string;
    username: string;
    profileImg: string;
    fullname: string;
};

export interface IUser extends IPostsUser{
    coverImg: string;
    bio: string;
    link: string;
    following: string[];
    followers: string[];
    createdAt: Date;
}
  
  