import { RequestHandler } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"

import User from "../models/User";
import Notification from "../models/Notification";


export const getUserProfile:RequestHandler = async (req,res,next) => {
    const {username} = req.params;

    try {
        const user = await User.findOne({username}).select("-password");
        if(!user)
            return res.status(404).json({message:"User not found"});

        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export const followUnFollowUser:RequestHandler<{id:string}, unknown, unknown, unknown> = async (req,res, next) => {

    const id = new mongoose.Types.ObjectId(req.params.id)
    try {
        const followUser = await User.findById(id)
        const currentUser = await User.findById(req.user._id)
        if(id===req.user._id)
            return res.status(400).json({error:"You can't unfollow/follow yourself"})

        if(!followUser || !currentUser)
            return res.status(400).json({error:"User not Found"})

        const isFollowing = currentUser.following.includes(id)

        if(isFollowing)
        {
            //UnFollow
            await User.findByIdAndUpdate(id,{ $pull: { followers: currentUser._id}})
            await User.findByIdAndUpdate(currentUser._id,{ $pull: { following: id}})
            res.status(200).json({message: "User unfollowed successfully"})
        }
        else
        {
            //Follow
            await User.findByIdAndUpdate(id,{ $push: { followers: currentUser._id}})
            await User.findByIdAndUpdate(currentUser._id,{ $push: { following: id}})

            //send notification
            const newNotification = new Notification({
                type: 'follow',
                from: currentUser._id,
                to: followUser._id
            })

            await newNotification.save();
            res.status(200).json({message: "User followed successfully"})
        }
        
    } catch (err) {    
        console.log(err)
        next(err)
    }
}

export const getSuggestedUsers:RequestHandler = async (req,res,next) => {
    try {
        const userId=req.user._id;

        const usersFollowedByMe = await User.findById(userId).select("following");

        const unfilteredSuggestedUsers = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId}
                },
            },
            { $sample: {size: 10}},
        ]);

        const filteredSuggestedUsers = unfilteredSuggestedUsers.filter(user => !usersFollowedByMe?.following.includes(user._id));
        const suggestedUsers = filteredSuggestedUsers.slice(0,4);

        suggestedUsers.forEach( user => user.password = null );

        res.status(200).json(suggestedUsers);
        
    } catch (err) {
        next(err)
    }
}

/*USER INTERFACE */
interface IUser{
    username?:string
    fullname?:string
    currentPassword?:string
    newPassword?:string
    email?:string
    coverImg?:string
    profileImg?:string
    bio?: string
    link?: string
}

export const updateUser:RequestHandler<unknown, unknown, IUser, unknown>  = async (req,res,next) => {
    const {fullname, email, username, currentPassword, newPassword, bio, link} = req.body;
    let {profileImg, coverImg} = req.body;

    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if(!user)
            return res.status(400).json({message: "User not found"})

        if((!newPassword && currentPassword) || (newPassword && !currentPassword))
            return res.status(400).json({error: "Please provide both current and new password"});

        if(currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch)
                return res.status(400).json({error: "Current password is incorrect"})
            if(newPassword.length<6)
                return res.status(200).json({error:"Password must be at least 6 characters"})

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword,salt);
        }
        if(profileImg)
        {
            if(user.profileImg)
            {   
                const publicId = user.profileImg.split("/").pop()?.split(".")[0];
                if(publicId)
                    await cloudinary.uploader.destroy(publicId)
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedResponse.secure_url;
        }
        if(coverImg)
        {
            if(user.coverImg)
                {   
                    const publicId = user.coverImg.split("/").pop()?.split(".")[0];
                    if(publicId)
                        await cloudinary.uploader.destroy(publicId)
                }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadedResponse.secure_url;
        }

        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        let savedUser = await user.save();

        savedUser.password = "";
        return res.status(200).json(savedUser)
    } catch (err) {
        next(err)
    }
}