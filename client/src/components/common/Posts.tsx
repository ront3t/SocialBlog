import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";

type User = {
    username: string;
    profileImg: string;
    fullName: string;
};
  
type Comment = {
    _id: string;
    text: string;
    user: User;
};
  
export type PostValues = {
    _id: string;
    text: string;
    img?: string; // Optional if some posts may not have an image
    user: User;
    comments: Comment[];
    likes: string[]; // Array of user IDs or similar
};


const Posts = () => {
	const isLoading = false;

	return (
		<>
			{isLoading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && POSTS?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && POSTS && (
				<div>
					{POSTS.map((post:PostValues) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;