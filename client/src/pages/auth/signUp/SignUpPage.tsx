import { useForm } from 'react-hook-form'
import {Link} from 'react-router-dom'

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

type FormValues = {
  email:string;
  username:string;
  fullname:string;
  password:string;
}

const SignUpPage = () => {

  const {register, handleSubmit, formState:{errors}} = useForm<FormValues>();

  const onSubmit = (data:FormValues) => {
    console.log(data);
  }
  return (
    <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
      <div className='flex-1 flex flex-col justify-center items-center'>
        <form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
          <label className='input input-bordered rounded flex items-center gap-2'>
            <MdOutlineMail />
            <input
              type='email'
              className='grow'
              placeholder='Email'
              {...register('email', { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
            />
          {errors.email && <p className='text-red-500'>Please enter a valid Email</p>}
          </label>
          <div className='flex gap-4 flex-wrap'>
            <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
              <FaUser />
              <input
                type='text'
                className='grow'
                placeholder='Username'
                {...register('username', { required: true })} 
              />
              {errors.username && <p className='text-red-500'>Please enter a valid Username</p>}
            </label>
            <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
              <MdDriveFileRenameOutline />
              <input
                type='text'
                className='grow'
                placeholder='Full Name'
                {...register('fullname', { required: true })} 
              />
              {errors.fullname && <p className='text-red-500'>Please enter a valid name</p>}
            </label>
          </div>
          <label className='input input-bordered rounded flex items-center gap-2'>
            <MdPassword />
            <input
              type='password'
              className='grow'
              placeholder='Password'
              {...register('password', { required: true })} 
            />
            {errors.password && <p className='text-red-500'>Please enter a valid password</p>}
          </label>
          <button className='btn rounded-full btn-primary text-white'>Sign Up</button>
        </form>
        <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
          <p className='text-white text-lg'>Already have an account?</p>
          <Link to='/login'>
            <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage