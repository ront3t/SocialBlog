import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type FormValues = {
    username: string;
    password: string;
}

const LoginPage = () => {
	const [formData, setFormData] = useState<FormValues>({
		username: '',
		password: ''
	});

	const queryClient = useQueryClient();

	const { mutate, isError, isPending, error } = useMutation({
		mutationFn: async ({ username, password }: FormValues) => {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
		onSuccess: () => {
			toast.success('Logged In Successfully')
			queryClient.invalidateQueries({queryKey:['authUser']});
		},
		onError: (err) => toast.error('Login failed'),
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate(formData);
	};

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		setFormData({ ...formData, [target.name]: target.value });
	};

	return (
		<div className="max-w-screen-xl mx-auto flex h-screen">
			<div className="flex-1 flex flex-col justify-center items-center">
				<form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
					<h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>

					<label className="input input-bordered rounded flex items-center gap-2">
						<MdOutlineMail />
						<input
							type="text"
							className="grow"
							placeholder="username"
							name="username"
							onChange={handleInputChange}
							value={formData.username}
						/>
					</label>

					<label className="input input-bordered rounded flex items-center gap-2">
						<MdPassword />
						<input
							type="password"
							className="grow"
							placeholder="Password"
							name="password"
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>

					<button className="btn rounded-full btn-primary text-white">
						{isPending ? 'Loading...' : 'Login'}
					</button>
					{isError && <p className="text-red-500">{(error as Error).message}</p>}
				</form>

				<div className="flex flex-col gap-2 mt-4">
					<p className="text-white text-lg">{"Don't"} have an account?</p>
					<Link to="/signup">
						<button className="btn rounded-full btn-primary text-white btn-outline w-full">Sign Up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
