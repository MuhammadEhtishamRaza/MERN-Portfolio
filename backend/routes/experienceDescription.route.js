import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  deleteExperienceDescription,
  getExperienceDescription,
  sendExperienceDescription,
  updateExperienceDescription,
} from "../controllers/experienceDescription.controller.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/description", getExperienceDescription);
router.post("/description", upload.none(), sendExperienceDescription);
router.put("/description/:id", upload.none(), updateExperienceDescription);
router.delete("/description/:id", deleteExperienceDescription);

export default router;
