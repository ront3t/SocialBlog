import express from "express";
import * as PostsController from "../controllers/Posts";

const router = express.Router();

router.get("/", PostsController.getPosts);


router.get("/:id", PostsController.getPostById);

router.post("/", PostsController.createPost);

router.delete("/id",PostsController.deletePost)

router.patch("/id",PostsController.updatePost)

export default router;