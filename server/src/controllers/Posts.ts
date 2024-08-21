import { RequestHandler } from "express";
import Post from "../models/Posts";
import User from "../models/User";

import {v2 as cloudinary} from "cloudinary"
import Notification from "../models/Notification";

interface ICreatePost{
    text?: string
    img?: string
}

interface ICommentPost{
    text?: string
}


export const getAllPosts:RequestHandler = async (req, res, next) => {
    try {
        const posts = await Post.find()
        .sort({createdAt: -1})
        .populate({
            path: "userId",
            select: "-password"
        })
        .populate({
            path: "comments.userId",
            select: "-password"
        })
        if(posts.length === 0)
            res.status(200).json([]);

        res.status(200).json(posts);
    } catch (err) {
        next(err)
    }
};

export const likeUnLikePost:RequestHandler<{id:string}, unknown, unknown, unknown> = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const userId = req.user._id;

      const post = await Post.findById(postId);
      if(!post)
        return res.status(404).json({message: 'Post not found'});

      if(post.likes.includes(userId))
      {
        //unlike
        await Post.updateOne({_id: postId},{$pull: { likes: userId}})
        await User.updateOne({_id: userId},{$pull: { likedPosts: postId}})
        return res.status(200).json({message: 'Post unliked successfully'})
      }
      else{
        //like
        post.likes.push(userId);
        await User.updateOne({_id: userId},{$push:{ likedPosts: postId}})
        await post.save();

        const notification = new Notification({
            from: userId,
            to: post.userId,
            type: 'like'
        })
        await notification.save()
        res.status(200).json({message: 'Post liked successfully'});
      }
    } catch (err) {
      next(err);
    }
};

export const commentOnPost:RequestHandler<{id:string}, unknown, ICommentPost, unknown> = async (req, res, next) => {
    try {
      const { text } = req.body;
      const postId = req.params.id;
      const userId = req.user._id;

      if(!text)
        return res.status(400).json({message: 'Text field is required'});

      const post = await Post.findById(postId);
      if(!post)
        return res.status(404).json({message: 'Post not found'});

      const comment = {text, userId: userId};
      post.comments.push(comment);
      await post.save();

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  };

export const deletePost:RequestHandler<{id:string}, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({message: "Post not found"});

        if(post.userId.toString() !== req.user._id.toString())
            return res.status(401).json({message: "U are not authorized to delete this post"})

        if(post.img)
        {
            const imgId = post.img.split('/').pop()?.split('.')[0];
            if(imgId)
                await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Post deleted successfully"});
    } catch (err) {
        next(err)
    }
};

export const createPost:RequestHandler<unknown, unknown, ICreatePost, unknown> = async (req, res, next) => {
    try {
        const {text} = req.body;
        let {img} = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if(!user)
            return res.status(404).json({message: "User not found"});

        if(!text && !img)
            return res.status(400).json({messge: "Post must have text or image"});
        
        if(img)
        {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            userId: userId,
            text,
            img
        })
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        next(err)
    }
};

export const getLikedPosts:RequestHandler = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user)
            return res.status(404).json({message: "User not found"});
    
        const likedPosts = await Post.find({_id: {$in: user.likedPosts}})
        .populate({
            path: "userId",
            select: "-password"
        })
        .populate({
            path: "comments.userId",
            select: "-password"
        });
    
        res.status(200).json({likedPosts});    
    } catch (err) {
        next(err)
    }
}

export const getFollowingPosts:RequestHandler = async (req,res,next) => {
    try {
        const user = await User.findById(req.user._id)
        if(!user)
            return res.status(404).json({message: "User not found"})

        const following = user.following;

        const feedPosts = await Post.find({userId: {$in: following}})
        .sort({createdAt: -1})
        .populate({
            path: "userId",
            select: "-password"
        })
        .populate({
            path: "comments.userId",
            select: "-password"
        });

        res.status(200).json(feedPosts);
    } catch (err) {
        next(err)
    }
}

export const getUserPosts:RequestHandler = async (req,res,next) => {
    try {
        const {username} = req.params;

        const user = await User.findOne({username});
        if(!user)
            return res.status(404).json({message: "User not found"});

        const posts = await Post.find({userId: user._id})
        .sort( {createdAt: -1})
        .populate({
            path: "userId",
            select: "-password"
        })
        .populate({
            path: "comments.userId",
            select: "-password"
        })
        res.status(200).json(posts);
    } catch (err) {
        next(err)
    }
}