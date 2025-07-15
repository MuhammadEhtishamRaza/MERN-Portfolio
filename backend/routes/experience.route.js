import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  deleteExperienceData,
  getExperienceData,
  sendExperienceData,
  updateExperienceData,
} from "../controllers/experience.controller.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/experience", getExperienceData);
router.post("/experience", upload.none(), sendExperienceData);
router.put("/experience/:id", upload.none(), updateExperienceData);
router.delete("/experience/:id", deleteExperienceData);

export default router;
