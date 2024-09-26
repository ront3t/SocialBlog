import React from 'react';
import {useForm} from 'react-hook-form'

type FormValues={
    fullName: string;
    username: string;
    email: string;
    bio: string;
    link: string;
    newPassword: string;
    currentPassword: string;
};


const EditProfileModal = () => {
	const {register, handleSubmit} = useForm<FormValues>();

    const onSubmit = (data:FormValues) => {
        alert("Profile updated successfully");
    }
    
    const onClickModal = () => {
        const myDialog = document.getElementById('edit_profile_modal') as HTMLDialogElement;
        myDialog.showModal();
    }

	return (
		<>
			<button
				className='btn btn-outline rounded-full btn-sm'
				onClick={onClickModal}
			>
				Edit profile
			</button>
			<dialog id='edit_profile_modal' className='modal'>
				<div className='modal-box border rounded-md border-gray-700 shadow-md'>
					<h3 className='font-bold text-lg my-3'>Update Profile</h3>
					<form
						className='flex flex-col gap-4'
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='flex flex-wrap gap-2'>
							<input
								type='text'
								placeholder='Full Name'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								{...register('fullName')}
							/>
							<input
								type='text'
								placeholder='Username'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                {...register('username')}
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='email'
								placeholder='Email'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                {...register('email', { pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}							/>
							<textarea
								placeholder='Bio'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								{...register('bio')}
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='password'
								placeholder='Current Password'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
							    {...register('currentPassword')}
							/>
							<input
								type='password'
								placeholder='New Password'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								{...register('newPassword')}
							/>
						</div>
						<input
							type='text'
							placeholder='Link'
							className='flex-1 input border border-gray-700 rounded p-2 input-md'
							{...register('link')}
						/>
						<button className='btn btn-primary rounded-full btn-sm text-white'>Update</button>
					</form>
				</div>
				<form method='dialog' className='modal-backdrop'>
					<button className='outline-none'>close</button>
				</form>
			</dialog>
		</>
	);
};
export default EditProfileModal;