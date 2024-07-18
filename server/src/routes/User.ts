import express from "express";
import * as UserController from "../controllers/User";

const router = express.Router();

router.get("/:id", UserController.getUser);

router.post("/register", UserController.register);

router.delete("/deleteUser",UserController.deleteUser)

export default router;