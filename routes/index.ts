import express, { response } from "express";
import { authController } from "../controllers/authController";
import { messageController } from "../controllers/messageController";
import { scheduleController } from "../controllers/scheduleController";
import { auth } from "../middleware/auth";
import { checkRole } from "../middleware/checkRole";
import { uploadController } from "../controllers/uploadController";
import { downloadController } from "../controllers/downloadController";

const router = express.Router();

// Auth routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", auth, authController.getCurrentUser);
router.post("/auth/save-profile", auth, authController.saveProfile);

// Upload routes
router.post("/uploadAvatar", auth, uploadController.uploadAvatar);
router.post("/uploadAttachment", auth, uploadController.uploadAttachment);

// Download routes (protected)
router.get(
  "/downloads/report-data",
  auth,
  downloadController.downloadReportData
);
router.get(
  "/downloads/attachment",
  auth,
  downloadController.downloadAttachment
);

// Schedule routes (protected)
router.post(
  "/schedule",
  auth,
  checkRole(["parent"]) as express.RequestHandler,
  scheduleController.createSchedule as express.RequestHandler
);

router.get(
  "/schedule",
  auth,
  scheduleController.getSchedule as express.RequestHandler
);

router.get(
  "/schedule/stats",
  auth,
  checkRole(["coach"]) as express.RequestHandler,
  scheduleController.getStats as express.RequestHandler
);

router.post(
  "/schedule/stats",
  auth,
  checkRole(["coach"]) as express.RequestHandler,
  scheduleController.updateScheduleStats as express.RequestHandler
);

router.get(
  "/schedule/individual",
  auth,
  checkRole(["coach"]) as express.RequestHandler,
  scheduleController.getIndividual as express.RequestHandler
);

// Message routes (protected)
router.get("/messages/coach", auth, messageController.getCoach);
router.get(
  "/messages/parents",
  auth,
  checkRole(["coach"]) as express.RequestHandler,
  messageController.getParentList
);
router.post("/messages", auth, messageController.sendMessage);
router.get("/messages/:otherUserId", auth, messageController.getConversation);
router.patch("/messages/:messageId/read", auth, messageController.markAsRead);

export default router;
