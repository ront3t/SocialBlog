import React, { useRef, useState } from "react";

import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface PostValues{
	text?:string,
	img?:string | null,
}

const CreatePost = () => {
	const [text, setText] = useState<string>("");
	const [img, setImg] = useState<string | null>(null);
	const imgRef = useRef<HTMLInputElement>(null);
    
	const {data:authUser} = useQuery({queryKey:['authUser']});
	const queryClient = useQueryClient();

	const {mutate, isPending, error, isError} = useMutation({
		mutationFn: async ({text,img}:PostValues) => {
			const res = await fetch('/api/posts/create',{
				method:'POST',
				headers:{
					'content-type':'application/json'
				},
				body:JSON.stringify({text,img})
			})
        	const data = await res.json();
        	if(!res.ok) throw new Error(data.error || "Something went wrong");
        	return data;
		},
		onError: (err) => toast.error('oops'),
		onSuccess: () => {
			setText('');
			setImg(null);
			toast.success('Horray!')
			queryClient.invalidateQueries({queryKey:['posts']})
		}
	})

	const data = {
		profileImg: "/avatars/boy1.png",
	};

    const onImgClick = () => {
        imgRef.current?.click();
    }

    const onTextChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }
	const handleSubmit = (e:React.FormEvent) => {
		e.preventDefault();
		mutate({text,img});
	};
    
    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setImg(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
    };

	return (
		<div className='flex p-4 items-start gap-4 border-b border-gray-700'>
			<div className='avatar'>
				<div className='w-8 rounded-full'>
					<img src={data.profileImg || "/avatar-placeholder.png"} />
				</div>
			</div>
			<form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
				<textarea
					className='textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800'
					placeholder='What is happening?!'
					value={text}
					onChange={onTextChange}
				/>
				{img && (
					<div className='relative w-72 mx-auto'>
						<IoCloseSharp
							className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
							onClick={() => {
								setImg(null);
                                if (imgRef.current) {
                                    imgRef.current.value = "";
                                  }
							}}
						/>
						<img src={img} className='w-full mx-auto h-72 object-contain rounded' />
					</div>
				)}

				<div className='flex justify-between border-t py-2 border-t-gray-700'>
					<div className='flex gap-1 items-center'>
						<CiImageOn
							className='fill-primary w-6 h-6 cursor-pointer'
							onClick={onImgClick}
						/>
						<BsEmojiSmileFill className='fill-primary w-5 h-5 cursor-pointer' />
					</div>
					<input type='file' hidden ref={imgRef} onChange={handleImgChange} />
					<button className='btn btn-primary rounded-full btn-sm text-white px-4'>
						{isPending ? "Posting..." : "Post"}
					</button>
				</div>
				{isError && <div className='text-red-500'>Something went wrong</div>}
			</form>
		</div>
	);
};
export default CreatePost;