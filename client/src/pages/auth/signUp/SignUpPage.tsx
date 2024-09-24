import { Link } from "react-router-dom";
import React, { useState } from "react";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type FormValues = {
  email:string;
  username:string;
  fullname:string;
  password:string;
}

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		email: '',
		username: '',
		fullname: '',
		password: '',
	});

	const queryClient = useQueryClient();

    const {mutate, isError, isPending, error} = useMutation({
    	mutationFn: async ({email,username,fullname,password}:FormValues) => {
        	const res = await fetch("/api/auth/register", {
          	method:"POST",
          	headers: {
            	"Content-Type":"application/json"
          	},	
          	body: JSON.stringify({email,username,fullname,password}),
        }); 

        	const data = await res.json();
        	if(!res.ok) throw new Error(data.error || "Something went wrong");
        	return data;
      
    	},
    	onSuccess: () => queryClient.invalidateQueries({queryKey: ['authUser']}),
		onError: (err) => toast.error('Login failed'),
  	})

	const handleSubmit = (e:React.FormEvent) => {
		e.preventDefault();
        mutate(formData);
    };

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

	return (
		<div className='max-w-screen-xl mx-auto flex h-screen px-10'>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
					<h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>
					<div className='flex gap-4 flex-wrap'>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<FaUser />
							<input
								type='text'
								className='grow '
								placeholder='Username'
								name='username'
								onChange={handleInputChange}
								value={formData.username}
							/>
						</label>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow'
								placeholder='Full Name'
								name='fullname'
								onChange={handleInputChange}
								value={formData.fullname}
							/>
						</label>
					</div>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='btn rounded-full btn-primary text-white'>
                        {isPending? 'Loading...': 'Sign Up'}
                    </button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				<div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
					<p className='text-white text-lg'>Already have an account?</p>
					<Link to='/login'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign in</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default SignUpPage;