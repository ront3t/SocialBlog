import { RequestHandler } from "express";
import Notification from "../models/Notification";

export const getnotifications:RequestHandler = async (req,res,next) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({to:userId}).populate({
            path: 'from',
            select: 'username profileImg',
        })

        await Notification.updateMany({to:userId},{read:true});
        return res.status(200).json(notifications);
    } catch (err) {
        next(err)
    }
}

export const deleteNotifications:RequestHandler = async (req,res,next) => {
    try {
        const userId = req.user._id;

        await Notification.deleteMany({to:userId})
        return res.status(200).json({message: 'Notifications deleted successfully'});
    } catch (err) {
        next(err)
    }
}

export const deleteNotification:RequestHandler = async (req,res,next) => {
    try {
        const notificationId = req.params.id;
        
        const notification = await Notification.findById(notificationId);
        if(!notification)
            return res.status(404).json({message: 'Notification not found'});
        
        if(notification.to !== req.user._id)
            return res.status(403).json({message: 'You are not authorized to delete this'})

        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({message: 'Notification deleted successfully'});

    } catch (err) {
        next(err)
    }
}