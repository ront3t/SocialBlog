import PostsModel from "../models/Posts";
import { RequestHandler } from "express";

interface IPost{
    userId: string,
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes:Array<string>,
    comments:Array<string>
}

export const getPosts:RequestHandler = async (req, res, next) => {
    try {
        const posts = await PostsModel.find();
        res.status(200).json(posts);
    } catch (err) {
        next(err)
    }
};

export const getPostById:RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await PostsModel.findById(id);
        res.status(200).json(post);
    } catch (err) {
        next(err)
    }
};

export const getUserPosts:RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const post = await PostsModel.find({ userId });
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  };

export const deletePost:RequestHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const post = await PostsModel.findByIdAndDelete(id);
        res.status(200).json(post);
    } catch (err) {
        next(err)
    }
};

export const createPost:RequestHandler<unknown, unknown, IPost, unknown> = async (req, res, next) => {
    try {
        const {
            userId,location, description, picturePath, userPicturePath,likes,comments
        } = req.body;
        
        const newPost = await PostsModel.create({
            userId,
            location,
            description,
            picturePath,
            userPicturePath,
            likes,
            comments
        });
        res.status(201).json(newPost);
    } catch (err) {
        next(err)
    }
};
