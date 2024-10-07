import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { FaArrowLeft } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import {  useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/formatPostDate";
import useFollow from "../../hooks/useFollow";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

import { IUser as User } from "../../types/user";

const ProfilePage = () => {
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [feedType, setFeedType] = useState<"posts" | "likes">("posts");

  const coverImgRef = useRef<HTMLInputElement>(null);
  const profileImgRef = useRef<HTMLInputElement>(null);

  const {username} = useParams<{username:string}>();

  const {follow, isPending} = useFollow();
  const {data:authUser} =useQuery<User>({queryKey:['authUser']});

  const {data:user, isLoading, refetch, isRefetching} = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/user/profile/${username}`);
        const data = await res.json();
        if(!res.ok) throw new Error(data.error || 'something went wrong');
        return data as User;
      } catch (err) {
        if(err instanceof Error)
          throw new Error(err.message);
        console.error('shooooot');        
      }
    },
  })

	const {updateProfile,isUpdatingProfile} = useUpdateUserProfile();

  useEffect(()=>{
    refetch();
  },[username,refetch])

  const memberSinceDate = formatMemberSinceDate(user? user.createdAt : new Date())
  const amIFollowing = authUser?.following.includes(user? user._id: '')
  const isMyProfile = user?._id === authUser?._id

  const handleImgChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    state: "coverImg" | "profileImg"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          if (state === "coverImg") {
            setCoverImg(result);
          } else if (state === "profileImg") {
            setProfileImg(result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateClick = async () => {
    await updateProfile({coverImg,profileImg});
    setCoverImg(null);
    setProfileImg(null);
  }

  return (
    <>
      <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
        {/* HEADER */}
        {(isLoading || isRefetching)? <ProfileHeaderSkeleton />
        : !user && (
          <p className="text-center text-lg mt-4">User not found</p>
        )}
        <div className="flex flex-col">
          {!(isLoading || isRefetching) && user && (
            <>
              <div className="flex gap-10 px-4 py-2 items-center">
                <Link to="/">
                  <FaArrowLeft className="w-4 h-4" />
                </Link>
              </div>
              {/* COVER IMG */}
              <div className="relative group/cover">
                <img
                  src={coverImg || user.coverImg || "/cover.png"}
                  className="h-52 w-full object-cover"
                  alt="cover image"
                  loading="lazy"
                />
                {isMyProfile && (
                  <div
                    className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
                    onClick={() => coverImgRef.current?.click()}
                  >
                    <MdEdit className="w-5 h-5 text-white" />
                  </div>
                )}

                <input
                  type="file"
                  hidden
                  ref={coverImgRef}
                  onChange={(e) => handleImgChange(e, "coverImg")}
                />
                <input
                  type="file"
                  hidden
                  ref={profileImgRef}
                  onChange={(e) => handleImgChange(e, "profileImg")}
                />
                {/* USER AVATAR */}
                <div className="avatar absolute -bottom-16 left-4">
                  <div className="w-32 rounded-full relative group/avatar">
                    <img
                      src={
                        profileImg ||
                        user.profileImg ||
                        "/avatar-placeholder.png"
                      }
                      alt="Profile"
                      loading="lazy"
                    />
                    <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
                      {isMyProfile && (
                        <MdEdit
                          className="w-4 h-4 text-white"
                          onClick={() => profileImgRef.current?.click()}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end px-4 mt-5">
                {isMyProfile ?<EditProfileModal />
                :(
                  <button
                    className="btn btn-outline rounded-full btn-sm"
                    onClick={() => follow(user._id)}
                  >
                    {isPending? 'loading...': amIFollowing? 'unFollow': 'Follow'}
                  </button>
                )}
                {(coverImg || profileImg) && (
                  <button
                    className="btn btn-primary rounded-full btn-sm text-white px-4 ml-2"
                    onClick={handleUpdateClick}
                  >
                    {isUpdatingProfile? 'Updating': 'Save'}
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4 mt-14 px-4">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{user.fullname}</span>
                  <span className="text-sm text-slate-500">
                    @{user.username}
                  </span>
                  <span className="text-sm my-1">{user.bio}</span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {user.link && (
                    <div className="flex gap-1 items-center ">
                      <>
                        <FaLink className="w-3 h-3 text-slate-500" />
                        <a
                          href={user.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {user.link.replace(/^https?:\/\//, "")}
                        </a>
                      </>
                    </div>
                  )}
                  <div className="flex gap-2 items-center">
                    <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500">
                      {memberSinceDate}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-xs">
                      {user.following.length}
                    </span>
                    <span className="text-slate-500 text-xs">Following</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-xs">
                      {user.followers.length}
                    </span>
                    <span className="text-slate-500 text-xs">Followers</span>
                  </div>
                </div>
              </div>
              <div className="flex w-full border-b border-gray-700 mt-4">
                <div
                  className={`flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer ${
                    feedType === "posts" ? "" : "text-slate-500"
                  }`}
                  onClick={() => setFeedType("posts")}
                >
                  Posts
                  {feedType === "posts" && (
                    <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" />
                  )}
                </div>
                <div
                  className={`flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer ${
                    feedType === "likes" ? "" : "text-slate-500"
                  }`}
                  onClick={() => setFeedType("likes")}
                >
                  Likes
                  {feedType === "likes" && (
                    <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" />
                  )}
                </div>
              </div>
            </>
          )}

          <Posts feedType={feedType} username={username} userId={user?._id} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
