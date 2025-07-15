import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  deleteServiceData,
  getServiceData,
  sendServiceData,
  updateServiceData,
} from "../controllers/service.controller.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/service", getServiceData);
router.post("/service", upload.single("image"), sendServiceData);
router.put("/service/:id", upload.single("image"), updateServiceData);
router.delete("/service/:id", deleteServiceData);

export default router;
