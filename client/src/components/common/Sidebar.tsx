import { Link } from "react-router-dom";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {IUser as User} from '../../types/user';


const Sidebar = () => {
  const queryClient = useQueryClient();

  // Logout Mutation
  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data as User;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (err) => toast.error("Logout Failed"),
  });

  // Fetch authenticated user data
  const { data: authUser, isLoading, isError: isUserError } = useQuery<User| null>({
    queryKey: ["authUser"],
  });

  if (isLoading) {
    return <p>Loading...</p>; // or a loading spinner component
  }

  if (isUserError) {
    return <p>Error loading user data</p>;
  }

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <IoNotifications className="w-6 h-6" />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${authUser?.username}`}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <FaUser className="w-6 h-6" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>
        {authUser ? (
			<Link
				to={`/profile/${authUser.username}`}
				className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
			>
				<div className="avatar hidden md:inline-flex">
				<div className="w-8 rounded-full">
					<img
					src={authUser.profileImg || "/avatar-placeholder.png"}
					alt="User Avatar"
					/>
				</div>
				</div>
				<div className="flex justify-between flex-1">
				<div className="hidden md:block">
					<p className="text-white font-bold text-sm w-20 truncate">
						{authUser.fullname}
					</p>
					<p className="text-slate-500 text-sm">@{authUser.username}</p>
				</div>
				<BiLogOut
					className="w-5 h-5 cursor-pointer"
					onClick={(e) => {
						e.preventDefault();
						mutate(); // Trigger the logout mutation
					}}
				/>
				</div>
			</Link>
			) : (
				<p>Loading user data...</p> // Fallback for when user data isn't available
			)}

      </div>
    </div>
  );
};

export default Sidebar;
