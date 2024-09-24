import express from "express";
import * as AuthController from "../controllers/Auth";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();

router.get("/me", protectRoute, AuthController.getMe);

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.post("/logout",AuthController.logout)

export default router;