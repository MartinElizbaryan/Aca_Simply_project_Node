import { Router } from "express"
import * as service from "./services.js"
import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { deleteNotificationSchema, updateNotificationSeenSchema } = validations

const router = Router()

router.get("/", service.getAllNotifications)
router.get("/unread", service.getUnreadNotifications)
router.patch("/:id", validate(updateNotificationSeenSchema), service.updateNotificationSeen)
router.delete("/:id", validate(deleteNotificationSchema), service.deleteNotification)

export { router as notificationsRoutes }
