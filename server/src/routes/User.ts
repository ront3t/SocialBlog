import express from "express";
import * as UserController from "../controllers/User";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();

router.get("/profile/:username",protectRoute, UserController.getUserProfile);

router.get("/suggested",protectRoute, UserController.getSuggestedUsers);

router.post("/follow/:id",protectRoute, UserController.followUnFollowUser)

router.post("/update",protectRoute ,UserController.updateUser)

export default router;