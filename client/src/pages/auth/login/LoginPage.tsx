import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import React from "react";

type FormValues = {
    username:string;
    password:string;
}

const LoginPage = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<FormValues>()
	
    const onSubmit = (data:FormValues) => {
        console.log(data);
    }
	return (
		<div className='max-w-screen-xl mx-auto flex h-screen'>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col' onSubmit={handleSubmit(onSubmit)}>
					<h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='text'
							className='grow'
							placeholder='username'
                            {...register('username', { required: true })} 
						/>
                        {errors.username && <p className='text-red-500'>username is invalid</p>}
					</label>

					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
                            {...register('password', { required: true })} 
						/>
					{errors.password && <p className='text-red-500'>password is invalid</p>}
					</label>
					<button className='btn rounded-full btn-primary text-white'>Login</button>
				</form>
				<div className='flex flex-col gap-2 mt-4'>
					<p className='text-white text-lg'>{"Don't"} have an account?</p>
					<Link to='/signup'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign Up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;