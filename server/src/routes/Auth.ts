import express from "express";
import * as AuthController from "../controllers/Auth";

const router = express.Router();

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.post("/logout",AuthController.logout)

export default router;