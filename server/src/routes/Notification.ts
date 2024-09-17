import express from "express"
import { protectRoute } from "../middleware/protectRoute";
import * as notificationController from "../controllers/Notification";

const router = express.Router();

router.get('/', protectRoute, notificationController.getnotifications)

router.delete('/',protectRoute, notificationController.deleteNotifications)

router.delete('/:id',protectRoute, notificationController.deleteNotification)

export default router;