import express from "express";
import * as PostsController from "../controllers/Posts";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();

router.get("/all",protectRoute, PostsController.getAllPosts);

router.post("/create",protectRoute, PostsController.createPost);

router.delete("/:id",protectRoute, PostsController.deletePost)

router.post("/like/:id",protectRoute, PostsController.likeUnLikePost)

router.post("/comment/:id",protectRoute, PostsController.commentOnPost)

router.get("/likes/:id", protectRoute, PostsController.getLikedPosts)

router.get("/following", protectRoute, PostsController.getFollowingPosts)

router.get("/:id", protectRoute, PostsController.getUserPosts)

export default router;