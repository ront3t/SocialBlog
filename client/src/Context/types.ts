export interface Post{
    userId: string,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes:Array<string>,
    comments:Array<string>
}

export interface User{
    name:string
    email:string
    password:string
    username:string
}