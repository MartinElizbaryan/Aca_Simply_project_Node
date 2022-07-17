import { Router } from "express"
import * as service from "./services.js"
import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"
import auth from "../../middlewares/auth.middleware.js"

const { deleteNotificationSchema, updateNotificationSeenSchema, delayDeletionSchema } = validations

const router = Router()

router.get("/", service.getAllNotifications)
router.get("/unread", service.getUnreadNotifications)
router.patch("/mark-all", auth, service.updateAllNotificationsSeen)
router.patch("/:id", validate(updateNotificationSeenSchema), service.updateNotificationSeen)
router.patch("/:id/delay", auth, validate(delayDeletionSchema), service.delayPostDelete)
router.delete("/:id", validate(deleteNotificationSchema), service.deleteNotification)

export { router as notificationsRoutes }
