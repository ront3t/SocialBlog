import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";

export type User = {
	_id:string;
    username: string;
    profileImg: string;
    fullname: string;
};
  
type Comment = {
    _id: string;
    text: string;
    userId: User;
};
  
export type PostValues = {
    _id: string;
    text: string;
    img?: string; // Optional if some posts may not have an image
    userId: User;
    comments: Comment[];
    likes: string[]; // Array of user IDs or similar
	createdAt: Date;
};

interface PostsProps {
	feedType:string,
	username?:string,
	userId?:string,
}

const Posts = ({feedType,username,userId}:PostsProps) => {

	const getPostEndPoint = () => {
		switch(feedType){
			case 'forYou':
				return '/api/posts/all';
			case 'following':
				return '/api/posts/following';
			case 'posts':
				return `/api/posts/user/${username}`;
			case 'liked':
				return `/api/posts/likes/${userId}`;
			default:
				return '/api/posts/all';
		}
	}
	
	const POST_ENDPOINT = getPostEndPoint();

	const {data:posts, isLoading, isRefetching} = useQuery({
		queryKey:['posts'],
		queryFn: async () => {
			try {
				const res = await fetch(POST_ENDPOINT)
				const data = await res.json();
				if(!res.ok) throw new Error(data.error||'something went wrong');
				return data as PostValues[];	
			} catch (err) {
				if(err instanceof Error)
					throw new Error(err.message);
				else
					console.error('Unexpected error occurred');
			}
		},
		
	})

	return (
		<>
			{(isLoading|| isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post:PostValues) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;